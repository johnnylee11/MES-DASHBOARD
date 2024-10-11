import express from 'express';
import cors from 'cors';
import productionRoutes from './production/routes/productionRoutes';
import qcRoutes from './QualityControl/routes/qcRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/production', productionRoutes);
app.use('/api/quality-control', qcRoutes);

export default app;
