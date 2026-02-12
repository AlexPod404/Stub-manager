import express from 'express';
import cors from 'cors';
import { RestAdapter } from './protocols/rest/rest.adapter';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'stub-manager-runtime' });
});

// Initialize REST adapter
const restAdapter = new RestAdapter(app);
restAdapter.initialize();

app.listen(port, () => {
  console.log(`Runtime service listening on port ${port}`);
});
