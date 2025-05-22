// controllers/aiAssistantController.js

async function askAI(req, res) {
    // Placeholder for AI logic, e.g. OpenAI API calls
    const { question } = req.body;
  
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
  
    // fake AI response example
    const fakeResponse = `This is a dummy answer to your question: "${question}"`;
  
    res.json({ answer: fakeResponse });
  }
  
  module.exports = {
    askAI,
  };
  