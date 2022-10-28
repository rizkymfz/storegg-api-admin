const mongoose = require('mongoose')
const { database } = require('../config')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(database);
}
const db = mongoose.connection

module.exports = db