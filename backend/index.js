import {PORT} from './utils/config.js'
import { Pick } from './pick.js';
import express from "express";
import cors from 'cors';
import { response } from 'express';

const app = express()
app.use(express.json())
app.use(cors());

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static('../frontend/build'))
}

// get main notes to display in react table
app.get('/form', (req, res) => {
    Pick.find({}).then(picks => res.send(picks)).catch(error => response.status(500).end())
})

app.get('/output/:data', (req, res) => {
    const params = JSON.parse(req.params.data);
    let op = {}
    let proj = {}
    if (params.type === 'box') {
        op = {
            $group: {
                _id: "$" + params.x_var,
                y: {$push: "$" + params.y_var}
            }
        } 
        proj = {
            $project: {
                _id: 0,
                name: '$_id',
                y: '$y',
                type: "box"
            }
        }
    } else {
        op = {
            $group: {
                _id: "$" + params.x_var,
                y: {$avg: "$" + params.y_var}
            }
        }
        proj = {
            $project: {
                _id: 0,
                name: '$_id',
                y: {$round: ['$y', 2]}
            }
        }
    }

    Pick.aggregate([
        {
            $match: {
                'pts_per_g': {$gte: params.filter_num.pts_per_g.min, $lte: params.filter_num.pts_per_g.max},
                'trb_per_g': {$gte: params.filter_num.trb_per_g.min, $lte: params.filter_num.trb_per_g.max},
                'ast_per_g': {$gte: params.filter_num.ast_per_g.min, $lte: params.filter_num.ast_per_g.max},
                'pos': {$in: params.filter_pos}
            }
        },
        op,
        proj,
        {
            $sort: {
                name: 1
            }
        }
        ]).then(picks => {
        if (picks.length === 0) {
            console.log('empty!!!')
            res.status(404).end()
        } else {
            res.send(picks);
        }
    }).catch(error => {
        res.status(500).end()
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})
