import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { RestProtocolHandler } from './protocols/rest/rest-handler';

const app: Application = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize protocol handlers
const restHandler = new RestProtocolHandler(app);

// Start server
app.listen(port, () => {
  console.log(`Stub Manager Runtime running on port ${port}`);
});

export default app;
