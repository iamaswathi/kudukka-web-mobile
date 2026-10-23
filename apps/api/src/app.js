import express from 'express';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import goalsRoutes from './routes/goals.routes.js';
console.log('app.js loaded');
const app = express();
app.use(express.json());
app.use(requestLogger);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/goals', goalsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;