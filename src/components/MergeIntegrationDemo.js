import React, { useState } from 'react';
import { useMergeLink } from '@mergeapi/react-merge-link';
import { createLinkToken, exchangePublicToken, fetchAccounts } from '../api/mergeApi';

const DEMO_USER = {
  email: 'test@example.com',
  organization: 'Demo Org',
  id: 'demo-user-123',
};

const MergeIntegrationDemo = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [accountToken, setAccountToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Step 1: Get link_token
  const handleGetLinkToken = async () => {
    setLoading(true);
    try {
      const token = await createLinkToken(DEMO_USER);
      setLinkToken(token);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Setup Merge Link
  const onSuccess = async (publicToken) => {
    setLoading(true);
    try {
      // Step 3: Exchange public_token for account_token
      const accToken = await exchangePublicToken(publicToken);
      setAccountToken(accToken);

      // Step 4: Fetch accounts
      const accs = await fetchAccounts(accToken);
      setAccounts(accs);
    } finally {
      setLoading(false);
    }
  };

  const { open, isReady } = useMergeLink({
    linkToken,
    onSuccess,
  });

  return (
    <div>
      <h2>Merge Unified API Demo</h2>
      <button onClick={handleGetLinkToken} disabled={loading || !!linkToken}>
        {loading ? 'Loading...' : 'Start Integration'}
      </button>
      {linkToken && (
        <button onClick={open} disabled={!isReady || loading}>
          Connect Account (Open Merge Link)
        </button>
      )}
      {accounts.length > 0 && (
        <div>
          <h3>Fetched Accounts</h3>
          <ul>
            {accounts.map(acc => (
              <li key={acc.id}>
                <b>{acc.name}</b> — {acc.classification} ({acc.account_type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MergeIntegrationDemo;
