import app from './app.js';
import { config } from 'dotenv';
import path from 'path';
import connectToDatabase from './core/db.js';

// setting up environment
const environment = process.env.NODE_ENV || 'development';
config({ path: path.resolve(`.env.${environment}`) });

const PORT = process.env.PORT || 3000;

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch(() => {
    // restart the app through pm2
    process.exit(1);
});