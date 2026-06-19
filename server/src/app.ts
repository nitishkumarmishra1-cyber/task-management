import express, { Request, Response } from 'express';

const app = express();

// middlewares
app.use(express.json());


app.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Hello from Express with TypeScript!' });
});


export default app;