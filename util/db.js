// import { MongoClient } from 'mongodb'
// const url = 'mongodb+srv://anewjean:qpflqpfl95!@cluster0.nqjbrwu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const options = { useNewUrlParser: true }
// let connectDB

// if (process.env.NODE_ENV === 'development') {
//     if (!global._mongo) {
//         global._mongo = new MongoClient(url, options).connect()
//     }
//     connectDB = global._mongo
// } else {
//     connectDB = new MongoClient(url, options).connect()
// } export { connectDB }

import mysql from 'mysql2/promise';

export async function connectDB() {
    const connectDB = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    });
    return connectDB;
}