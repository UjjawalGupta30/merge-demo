const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'WNsXYHTBf3a26aoJBxnbZBM4pzoQ6HNWf2lNiwnxgswKHNbVSOLPNA'; // <-- Replace with your Merge API key

// Proxy for creating link token
app.post('/api/create-link-token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.merge.dev/api/integrations/create-link-token',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message, details: err.response?.data });
  }
});

// Proxy for exchanging public_token for account_token
app.get('/api/account-token/:publicToken', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.merge.dev/api/integrations/account-token/${req.params.publicToken}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message, details: err.response?.data });
  }
});

// Proxy for fetching accounts using account_token
app.get('/api/accounts', async (req, res) => {
  const accountToken = req.header('X-Account-Token');
  if (!accountToken) {
    return res.status(400).json({ error: 'Missing X-Account-Token header' });
  }
  try {
    const response = await axios.get('https://api.merge.dev/api/accounting/v1/accounts', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-Account-Token': accountToken,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message, details: err.response?.data });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
