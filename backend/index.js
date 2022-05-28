import express from "express";

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world");
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})