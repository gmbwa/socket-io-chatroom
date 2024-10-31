import Joi from "joi";
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

interface EnvConfig {
    MONGODB_URI: string;
    PORT: number;
}

// Define the validation schema
const envSchema = Joi.object<EnvConfig>({
    MONGODB_URI: Joi.string().uri().required(),
    PORT: Joi.number().default(5000),
}).unknown(); // Allow unknown keys 

const { error, value: envValue } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Environment variable validation error: ${error.message}`);
}

export const config = {
    MONGODB_URI: envValue.MONGODB_URI,
    PORT: envValue.PORT,

}