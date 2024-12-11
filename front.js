Front-End(React)
jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>DevInsights</h1>
      <p>Project Name: {data.projectName}</p>
      <p>Team Members: {data.teamMembers}</p>
      <p>Code Quality: {data.codeQuality}</p>
      <p>Test Coverage: {data.testCoverage}</p>
    </div>
  );
}

export default App;


Back-end Code (Node.js)


const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const jiraResponse = await axios.get();
    const confluenceResponse = await axios.get();
    const bitbucketResponse = await axios.get();

    const data = {
      projectName: jiraResponse.data.name,
      teamMembers: jiraResponse.data.lead.displayName,
      codeQuality: bitbucketResponse.data.size,
      testCoverage: confluenceResponse.data.results[0].title
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
 