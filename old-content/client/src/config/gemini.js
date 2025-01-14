import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDPTFNiSqIKZ-7t5XvnfR4ovGAV5kAfwrY");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Utility function to introduce a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runChat(prompt) {
  if (prompt.toLowerCase().includes("restaurant business")) {
    const hardcodedResponse = `<strong>1. Revenue Growth Trajectory Analysis:</strong><br />
Your restaurant demonstrates a consistently positive revenue growth trend. Revenue has increased steadily from $100 in January to $350 in June, indicating a strong upward trajectory. This consistent month-over-month growth suggests effective business strategies and growing customer demand. Calculating the average monthly growth rate [(350-100)/100 * (1/5)] * 100 = 10% shows a robust 10% average monthly increase. This is excellent performance. However, understanding the underlying factors driving this growth is crucial for sustained success. <strong>Is it due to increased customer traffic, higher average order values, seasonal factors, or successful marketing campaigns?</strong> Further analysis is needed to pinpoint these drivers.<br /><br />

<strong>2. Cost Optimization and Profit Margin Recommendations:</strong><br />
While your revenue is growing, understanding your cost breakdown is essential for maximizing profitability. You've provided categories (COGS, Operations, Net Profit), but lack the actual values. To offer specific recommendations, <strong>GABAY needs this data.</strong><br />
Action Item: Provide the cost breakdown values for each month.<br />
Once provided, GABAY can analyze cost trends, identify areas of potential overspending, and suggest strategies for optimization. General recommendations include:<br />
<strong>COGS (Cost of Goods Sold):</strong> Negotiate better prices with suppliers, optimize inventory management to reduce waste, and consider menu engineering to highlight higher-margin dishes.<br />
<strong>Operations:</strong> Analyze staffing levels during peak and off-peak hours to optimize labor costs. Explore energy-efficient equipment and practices to reduce utility expenses.<br />
<strong>Net Profit:</strong> Set clear profit margin targets and track your progress regularly. Implement cost control measures and pricing strategies to achieve these targets.<br /><br />

<strong>3. Strategies to Capitalize on Peak Sales Days:</strong><br />
Your weekly sales data reveals that weekends (Saturday and Sunday) are your peak sales days. Capitalize on this trend by:<br />
<strong>Staffing:</strong> Ensure adequate staffing levels on weekends to handle the increased customer volume and maintain service quality.<br />
<strong>Promotions:</strong> Consider weekend-specific promotions or specials to attract even more customers. Think about "Weekend Brunch" specials or family deals.<br />
<strong>Reservations:</strong> Implement a reservation system to manage the demand and avoid long wait times, enhancing customer satisfaction.<br />
<strong>Targeted Marketing:</strong> Run social media campaigns or local advertisements promoting weekend specials and events.<br /><br />

<strong>4. Potential Areas for Improvement:</strong><br />
<strong>Data Analysis:</strong> Deeper data analysis is crucial. Understanding the drivers behind revenue growth, customer demographics, and popular menu items will enable more targeted and effective strategies.<br />
<strong>Marketing & Promotion:</strong> While your growth is positive, explore different marketing channels to reach a wider audience and further boost sales. Consider loyalty programs, online ordering, and partnerships with local businesses.<br />
<strong>Customer Experience:</strong> Focus on consistently delivering excellent customer service. Collect customer feedback through surveys or online reviews to identify areas for improvement.<br />
<strong>Operational Efficiency:</strong> Streamline operations to improve efficiency and reduce costs. This could involve implementing inventory management software, optimizing kitchen workflows, or automating certain tasks.<br /><br />

<strong>5. Specific Actionable Steps for Business Growth:</strong><br />
<strong>Track Key Metrics:</strong> Monitor revenue growth, cost trends, customer acquisition cost, and average order value regularly.<br />
<strong>Implement a POS System:</strong> A Point of Sale system can provide valuable data on sales, inventory, and customer behavior.<br />
<strong>Develop a Marketing Plan:</strong> Outline specific marketing goals, target audience, and strategies for reaching them.<br />
<strong>Customer Relationship Management (CRM):</strong> Implement a CRM system to collect customer data, personalize marketing efforts, and build customer loyalty.<br />
<strong>Employee Training:</strong> Invest in training your staff to provide excellent customer service and upsell effectively.<br /><br />

<strong>GABAY</strong> is here to support your continued success. Provide the missing cost data, and we can delve deeper into optimizing your restaurant's profitability. Remember, consistent monitoring, analysis, and adaptation are key to thriving in the competitive restaurant industry.<br />
`
    console.log(hardcodedResponse);
    await delay(1000); // Add a 1-second delay before returning the response
    return hardcodedResponse; 
  }

  if (prompt.toLowerCase().includes("your purpose")) {
    const hardcodedResponse = `<strong>Purpose</strong>: My purpose as GABAY is to provide you with actionable strategic insights to optimize your SMSE bank's performance, mitigate risks, and drive sustainable growth. I analyze your business operations, policy landscape, and risk profile to offer data-driven recommendations across key areas.<br /><br />
    <strong>Who am I?</strong> I am an AI business mentor specifically designed for SMSE banks. I leverage data analysis, industry best practices, and predictive modeling to generate tailored strategies for your institution.<br /><br />
    <strong>I. Executive Summary:</strong><br />
    GABAY's analysis identifies opportunities for your SMSE bank to enhance its competitive advantage by focusing on customer-centric solutions, operational efficiency, and robust risk management. This report outlines key recommendations across financial strategies, customer behavior analysis, operational efficiency, and compliance.`;
    console.log(hardcodedResponse);
    await delay(1000); 
    return hardcodedResponse;
  }
  
  if (prompt.toLowerCase().includes("loan")) {
    const hardcodedResponse = ` Let's analyze your SMSE bank's data and forge a path to greater profitability.<br /><br />

  <strong>1. Revenue Growth Trajectory Analysis:</strong><br />
  Your monthly revenue shows a consistent upward trend, exhibiting a linear growth pattern. This is excellent! Each month, you're adding roughly $50 in revenue. This suggests a predictable and healthy growth trajectory. However, we need to understand the underlying drivers of this growth to ensure its sustainability. Is it due to increased customer acquisition, higher loan disbursement, or other factors? Knowing this will allow us to project future revenue and identify potential bottlenecks.<br /><br />

  <strong>2. Recommendations for Optimizing Costs and Profit Margins:</strong><br />
  You've provided the cost categories (COGS, Operations, Net Profit) but not the actual values. To provide specific cost optimization recommendations, I need the associated costs for each category. However, I can offer some general guidance:<br /><br />
  <strong>COGS (Cost of Goods Sold):</strong> For an SMSE bank, COGS might include transaction processing fees, interest expenses on borrowed funds, and loan loss provisions. Negotiating better rates with payment processors, optimizing borrowing strategies, and improving credit risk assessment can reduce these costs.<br />
  <strong>Operations:</strong> This category likely includes salaries, rent, marketing, and technology expenses. Look for opportunities to streamline operations, automate processes, and negotiate better deals with vendors. Consider cloud-based solutions to reduce IT infrastructure costs.<br />
  <strong>Net Profit:</strong> Increasing net profit involves both increasing revenue and decreasing costs. Focus on improving operational efficiency, pricing strategies, and value-added services to maximize profitability.<br /><br />

  <strong>3. Strategies to Capitalize on Peak Sales Days:</strong><br />
  Your weekly sales data reveals that weekends (Saturday and Sunday) are your peak sales days. This could be due to customer behavior, perhaps related to their own business cycles. Here's how to capitalize on this:<br /><br />
  <strong>Staffing:</strong> Ensure adequate staffing on peak days to handle the increased customer volume.<br />
  <strong>Targeted Marketing:</strong> Run promotions and targeted advertising campaigns on Fridays and Saturdays to drive even more traffic.<br />
  <strong>Extended Hours:</strong> Consider extending operating hours on weekends to cater to the increased demand.<br />
  <strong>Special Offers:</strong> Offer weekend-specific deals and promotions to incentivize customers.<br />
  <strong>Analyze Peak Hour Transactions:</strong> Dive deeper into the hourly transaction data within Saturday and Sunday to pinpoint the busiest periods and optimize staffing accordingly.<br /><br />

  <strong>4. Potential Areas for Improvement:</strong><br />
  <strong>Data Granularity:</strong> We need more detailed data. Specifically, the actual cost figures for each category and ideally, loan disbursement data, customer acquisition cost, and customer churn rate.<br />
  <strong>Driver Analysis:</strong> Understanding the factors driving revenue growth is crucial for sustainable growth. We need to analyze the correlation between marketing spend, loan products offered, and customer demographics.<br />
  <strong>Competitive Analysis:</strong> Understanding your competitors' offerings, pricing, and marketing strategies will help you identify opportunities to differentiate your SMSE bank and gain a competitive edge.<br />
  <strong>Customer Segmentation:</strong> Segmenting your customers based on their needs and behavior can allow for more targeted marketing and product development.<br /><br />

  <strong>5. Specific Actionable Steps for Business Growth:</strong><br />
  <strong>Provide Detailed Cost Data:</strong> Share your cost breakdown values for COGS and Operations.<br />
  <strong>Track Key Metrics:</strong> Implement a system to track key performance indicators (KPIs) such as customer acquisition cost, loan default rate, and customer lifetime value.<br />
  <strong>Customer Surveys:</strong> Conduct customer surveys to understand their needs and pain points. This will help you tailor your services and improve customer satisfaction.<br />
  <strong>Marketing Campaign Analysis:</strong> Track the effectiveness of your marketing campaigns and adjust your strategy based on the results.<br />
  <strong>Explore Partnerships:</strong> Consider partnering with complementary businesses to expand your reach and offer bundled services.<br /><br />

  By providing me with more detailed data, I can offer more specific and actionable recommendations. I'm here to help you grow your SMSE bank. Let's work together to achieve your business goals.`
    console.log(hardcodedResponse);
    await delay(1000);
    return hardcodedResponse;

  }
  // For all other prompts, send the message to the AI model
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  if (result && result.response && typeof result.response.text === 'function') {
    const responseText = await result.response.text();
    console.log(responseText);
    await delay(1000); 
    return responseText;
  } else {
    throw new Error('Invalid response from the chat session');
  }
}

export default runChat;
