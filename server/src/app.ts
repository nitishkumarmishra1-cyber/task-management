import express, { Request, Response } from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import router from './routes/index.js';
import { corsConfig } from './core/setting.js';
import cors from 'cors';
import { AppError } from './core/app.error.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

// middlewares
app.use(helmet())
app.use(cors(corsConfig))
app.use(express.json());
app.use(cookieParser());

// routes
app.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Hello from Express with TypeScript!' });
});
app.use('/api', router)
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// error middleware
app.use(errorHandler)

export default app;