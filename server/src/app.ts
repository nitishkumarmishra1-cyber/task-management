import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';

import router from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { corsConfig } from './core/setting.js';
import { AppError } from './core/app.error.js';
import { createServer } from 'node:http';
import initSocket from './socket/index.js';


const app = express();

// setup socket server
const server = createServer(app);
initSocket(server);

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is healthy!' });
})

const clientPath = path.resolve('client'); 
app.use(express.static(clientPath));

app.get('/*splat', (req: Request, res: Response) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

export default server;