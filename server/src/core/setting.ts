import { CorsOptions } from 'cors';
import { config } from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';
config({ path: path.resolve(`.env.${environment}`) });

export const AppSetting = {
    secretKey : process.env.JWT_SECRET_KEY!,
    dbUrl : process.env.MONGO_DB_URL!,
    PORT : process.env.PORT!
} as const;

export const corsConfig: CorsOptions = {
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    maxAge: 5 * 60 * 60,
} as const;