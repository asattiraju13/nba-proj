import {PORT,} from './utils/config.js'
import { Pick } from './pick.js';
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import { response } from 'express';

const app = express()
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello world")
})

// get main notes to display in react table
app.get('/form', (req, res) => {
    Pick.find({}).then(picks => res.send(picks)).catch(error => response.status(500).end())
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})