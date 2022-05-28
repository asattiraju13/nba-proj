import {PORT,} from './utils/config.js'
import { pick } from './pick.js';
import express from "express";

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})