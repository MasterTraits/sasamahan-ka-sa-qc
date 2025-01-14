import {createContext, useContext, useState} from 'react'

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [prevChat, setPrevChat] = useState('')

    const updatePrevChat = (chat) => {
        setPrevChat(chat)
    }


   return (
         <ChatContext.Provider value={{prevChat, updatePrevChat}}>
              {children}
         </ChatContext.Provider>
   ) 
}

export const useChatContext = () => {
    return useContext(ChatContext)
}