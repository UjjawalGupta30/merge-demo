import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000';

// 1. Create Link Token (calls backend)
export const createLinkToken = async (user) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/create-link-token`, {
      end_user_email_address: user.email,
      end_user_organization_name: user.organization,
      end_user_origin_id: user.id,
      categories: ['accounting'],
    });
    return res.data.link_token;
  } catch (err) {
    console.error('Error creating link token:', err.response?.data || err.message);
    throw err;
  }
};

// 2. Exchange public_token for account_token (calls backend)
export const exchangePublicToken = async (publicToken) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/account-token/${publicToken}`);
    return res.data.account_token;
  } catch (err) {
    console.error('Error exchanging public token:', err.response?.data || err.message);
    throw err;
  }
};

// 3. Fetch accounts using account_token (calls backend for security)
export const fetchAccounts = async (accountToken) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/accounts`, {
      headers: {
        'X-Account-Token': accountToken,
      },
    });
    return res.data.results;
  } catch (err) {
    console.error('Error fetching accounts:', err.response?.data || err.message);
    throw err;
  }
};
