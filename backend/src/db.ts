import mongoose from 'mongoose';
import { config } from './config';

export const connectDatabase = async () => {
    try {
        const mongoURI: string = config.MONGODB_URI;

        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        // exit if there is a failure
        process.exit(1);
    }
};
