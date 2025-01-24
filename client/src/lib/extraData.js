
// DATE
const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
});

// RANDOM ID
const randomId = Math.random().toString(36).substr(2, 9),
      messageId = Date.now().toString();


export { formattedDate, randomId, messageId}