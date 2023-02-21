import mongoose from 'mongoose'
import { config } from '../config/index.js'

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(config.database);
}
const db = mongoose.connection

export default db