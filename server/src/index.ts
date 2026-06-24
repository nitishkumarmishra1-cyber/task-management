import server from './app.js';
import connectToDatabase from './core/db.js';
import { AppSetting } from './core/setting.js';

const PORT = AppSetting.PORT || 3000;

connectToDatabase().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch(() => {
    // restart the app through pm2
    process.exit(1);
});