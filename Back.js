Back-End(Node.js):
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