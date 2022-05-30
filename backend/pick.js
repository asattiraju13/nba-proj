//data base config module
import mongoose from "mongoose"
import {PORT, MONGO_DB_URI} from './utils/config.js'

mongoose.connect(MONGO_DB_URI).then(
    result => {
        console.log("Successfully connected to MongoDB!")
    }
).catch(
    error => {
        console.log("Error connecting: ", error.message)
    }
)

const top_pick_schema = new mongoose.Schema({
    year: Number,
    pick: Number,
    team_id: String,
    pos: String,
    player: String,
    mp_per_g: Number,
    efg_pct: Number,
    pts_per_g: Number,
    trb_per_g: Number,
    ast_per_g: Number,
    ws: Number,
    bpm: Number
})

top_pick_schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Pick = mongoose.model("Top_pick", top_pick_schema)

export {
    Pick
}