import { connect } from 'mongoose';
import { AppSetting } from './setting.js';

export default async function connectToDatabase() {
    const dbUrl = AppSetting.dbUrl;

    console.log(dbUrl)

    if (!dbUrl) {
        throw new Error('MONGO_DB_URL is missing from your environment configuration.');
    }

    try {
        await connect(dbUrl);
    } catch (error) {
        throw error;
    }
}