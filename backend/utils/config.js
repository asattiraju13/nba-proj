import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3001
const MONGO_DB_URI = process.env.MONGO_DB_URI

export {
    PORT, MONGO_DB_URI
}