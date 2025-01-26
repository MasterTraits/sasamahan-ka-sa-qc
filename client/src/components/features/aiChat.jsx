import AIHeader from "./aiChatComponents/aiHeader";
import Footer from "../layout/textarea";
import UserChatBubble from "./aiChatComponents/userChatBubble";
import AiChatBubble from "./aiChatComponents/aiChatBubble";
import LdotStream from "@/components/ui/loading/dotStream";

import { UserInputContext } from "@/contexts/useUserContext";
import runChat from "@/config/gemini";
import api from "@/config/jsonserver";
import axios from "axios";
import Form from './form';
import { useParams  } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { formattedDate, randomId, messageId } from "@/lib/extraData";

export default function AiChat({ textValue }) {
  const { id } = useParams();
  const { userInput, chatHistory, setChatHistory } =
    useContext(UserInputContext);
  const [chatData, setChatData] = useState({});

  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [showContextForm, setShowContextForm] = useState(true); // State to control the visibility of the context form
  const [businessType, setBusinessType] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [businessPlacement, setBusinessPlacement] = useState("");
  const [financeUnderstanding, setFinanceUnderstanding] = useState("");
  const [comfortWithGraphs, setComfortWithGraphs] = useState("");

  useEffect(() => {
    if (textValue) postData(textValue);
    else {
      fetchData();
      putData();
    }
  }, [userInput]);

  useEffect(() => {
    generateTitle(chatHistory);
  }, [chatHistory]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateTitle = async (chatHistory) => {
    if (chatHistory.length === 0) {
      setGeneratedTitle("New Conversation");
      return; // Exit early
    } else if (chatHistory.length < 3) {
      setGeneratedTitle("Generating Title...");
      return; // Exit early
    }

    try {
      const payload = {
        chat_history: chatHistory.map((chat) => ({
          role: chat.ai ? "assistant" : "user", // Determine role based on whether it's an AI response
          content: chat.ai ? chat.ai : chat.user, // Use AI response or user input
        })),
      };

      const response = await axios.post(
        "http://localhost:8000/api/title",
        payload, // Send the transformed payload
        {
          headers: {
            "Content-Type": "application/json", // Set headers
          },
        }
      );
      console.log("API Response:", response.data); // Log the response
      setGeneratedTitle(response.data.title);
    } catch (error) {
      console.error("Error generating title:", error.message); // Log the specific error
      setGeneratedTitle("Error generating title");
    }
  };


  const handleContextSubmit = async (e) => {
    e.preventDefault();
    setShowContextForm(false); // Hide the form after submission

    const context = {
      business_type: businessType,
      monthly_revenue: monthlyRevenue,
      business_placement: businessPlacement,
      finance_understanding: financeUnderstanding,
      comfort_with_graphs: comfortWithGraphs,
    };

    try {
      // Send the context to the backend
      await axios.post('http://localhost:8000/api/set-context', context);
      console.log("Context submitted successfully");
    } catch (error) {
      console.error("Error submitting context:", error.message);
    }
  };
  const handleSkipForm = () => {
    setShowContextForm(false); // Hide the form without submitting
    console.log("Form skipped, no context provided");
  };

  const putData = async () => {
    if (!userInput || userInput.trim() === "") return;
    setLoadingMessageId(messageId);

    try {
      const response = await runChat(userInput);
      if (!response || typeof response !== "string")
        throw new Error("Invalid response from the API");

      await api 
        .put(`/history/${id}`, {
          ...chatData,
          messages: [
            ...(chatData.messages || []),
            {
              id: messageId,
              user: userInput,
              ai: response,
            },
          ],
        })
        .catch((err) => {
          console.error("Failed to post chat history:", err);
        });

      const fetchData = await api.get(`/history/${id}`);
      setChatData(fetchData.data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoadingMessageId(null);
    }
  };

  const postData = async (initialData) => {
    if (!initialData) return;
    const title = "";
    setLoadingMessageId(messageId);

    try {
      const response = await runChat(initialData);
      if (!response || typeof response !== "string")
        throw new Error("Invalid response from the API");

      await api
        .post("/history", {
          id: randomId,
          title: title || "New Chat",
          date: formattedDate,
          messages: [
            {
              id: messageId,
              user: initialData,
              ai: response,
            },
          ],
        })
        .catch((err) => {
          console.error("Failed to post chat history:", err);
        });

      const fetchData = await api.get(`/history/${randomId}`);
      setChatData(fetchData.data);
    } catch (err) {
      console.error("Error fetching AI response:", err);
    } finally {
      setLoadingMessageId(null);
    }
  };

  return (
    <>
      <main className="h-screen shadow-xl flex flex-col p-4 ">
        <AIHeader title={generatedTitle} />

        <section className="p-4 flex-grow h-auto overflow-x-auto">
          <Form 
            showContextForm={showContextForm}
            handleContextSubmit={handleContextSubmit}
            handleSkipForm={handleSkipForm}
            businessType={businessType}
            setBusinessType={setBusinessType}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}
            businessPlacement={businessPlacement}
            setBusinessPlacement={setBusinessPlacement}
            financeUnderstanding={financeUnderstanding}
            setFinanceUnderstanding={setFinanceUnderstanding}
            comfortWithGraphs={comfortWithGraphs}
            setComfortWithGraphs={setComfortWithGraphs}
          />
        </section>
        <section className="p-4 flex-grow h-auto overflow-y-auto">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="space-y-4 mb-6">
              <UserChatBubble message={chat.user} />
              {chat.id === loadingMessageId ? (
                <div className="flex justify-start p-4">
                  <LdotStream size="60" speed="2.5" color="black"></LdotStream>
                </div>
              ) : (
                chat.ai && <AiChatBubble message={chat.ai} />
              )}
            </div>
          ))}
        </section>

        <Footer />
      </main>
    </>
    
  );
}
