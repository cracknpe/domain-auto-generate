import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const NAMESILO_API_KEY = '46e8d2ef38e6222b87e471bd';

app.get('/api/check-domain', async (req, res) => {
  const { domains } = req.query;
  
  if (!domains) {
    return res.status(400).json({ error: 'Domains parameter is required' });
  }

  try {
    const response = await axios.get('https://www.namesilo.com/api/checkRegisterAvailability', {
      params: {
        version: 1,
        type: 'json',
        key: NAMESILO_API_KEY,
        domains
      }
    });

    if (!response.data?.reply?.code || response.data.reply.code !== 300) {
      throw new Error('Invalid response from NameSilo API');
    }

    res.json(response.data);
  } catch (error) {
    console.error('NameSilo API error:', error.message);
    res.status(500).json({ 
      error: 'Failed to check domain availability',
      message: error.message 
    });
  }
});

app.listen(PORT, "0.0.0.0",() => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});