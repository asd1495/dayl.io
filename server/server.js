require('dotenv').config();

// index.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/analyzeSentiment', async (req, res) => {
  try {
    // Get the text data from the request body
    const { textToAnalyze } = req.body;

    // Call the OpenAI API with your API key
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      {
        prompt: textToAnalyze,
        max_tokens: 50, // Adjust based on your needs
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    // Extract sentiment analysis or summary from the OpenAI response
    const sentimentAnalysis = response.data.choices[0].text;

    // Return the sentiment analysis or summary as JSON
    res.json({ sentimentAnalysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
