import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    serviceName : process.env.SERVICE_NAME,
    database: process.env.MONGO_URL,
    rootPath : path.resolve(__dirname, '..'),
    jwtKey : process.env.JWT_SECRET
}

export default config;