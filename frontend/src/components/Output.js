import AnimatedPage from "./AnimatedPage";
import '../styles/Output.css';
import axios from 'axios';
import Plot from 'react-plotly.js'
import { useEffect, useState} from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";


const ParamFormat = ({params}) => {

    return (
        <div className="mr-10 flex flex-row items-start justify-center text-blue-600">
            <div className="text-3xl font-bold mr-10 self-center">FILTERS</div>
            <div className="text-left mr-10">
                <div className="text-xl font-bold">
                    Positions Considered
                </div>
                {params.filter_pos.length > 0 ? params.filter_pos.map((pos, i) => <li key={i}>{pos}</li>) : <li>None</li>}
            </div>
            <div className="text-left mr-10">
                <div className="text-xl font-bold">
                    Numeric Ranges (Inclusive)
                </div>
                <li>Points Per Game: {params.filter_num.pts_per_g.min} to {params.filter_num.pts_per_g.max}</li>
                <li>Rebounds Per Game: {params.filter_num.trb_per_g.min} to {params.filter_num.trb_per_g.max}</li>
                <li>Assists Per Game: {params.filter_num.ast_per_g.min} to {params.filter_num.ast_per_g.max}</li>
            </div>
        </div>
    )
}

const Output = ({params}) => {

    const navigate = useNavigate();
    const [output, setOutput] = useState({
        data: [],
        layout: {}
    });
    const [error, setError] = useState(false);

    function assembleOutput(response) {
        if (params.type === 'box') {
            setOutput({
                data: response.data,
                layout: {autosize: true, title: params.y_var + " vs. " + params.x_var}
            })
        } else {
            let x = []
            let y = []
            const colors = ["#AF82F3","#F38282","#82B3F3","#F3A082","#56BD7C"]
            let c = []

            for (let i = 0; i < response.data.length; i++) {
                x.push(response.data[i].name)
                y.push(response.data[i].y)
                c.push(colors[i % colors.length])
            }

            setOutput({
                data: [{x: x, y: y, type: 'bar', marker: {color: c}}],
                layout: {autosize: true, title: "mean " + params.y_var + " vs. " + params.x_var}
            })
        }
    }

    useEffect(() => {
        const data = JSON.stringify(params);
        const url = "http://localhost:3001/output/" + encodeURIComponent(data);
        
        axios.get(url).then(response => {
            console.log(response.data)
            assembleOutput(response)
        }).catch(error => {
            setError(true);
        })
    },[])
    
    return (
        <AnimatedPage>
            <div className="output min-h-screen text-center
            text-white flex flex-col items-center justify-center">
                <header className="text-5xl font-bold mb-8 mt-4">
                Your Plot!
                </header>
                <div className="mb-8 w-2/3">
                    <ParamFormat params={params}/>
                </div>
                {!error && <Plot
                    className="mb-8 w-2/3 h-3/4"
                    useResizeHandler={true}
                    data={output.data}
                    layout={output.layout}
                />}
                {error && <div className="text-2xl text-red-400 font-bold mb-8 w-1/3">There was an error in retrieving the data. It is possible there are no records matching your criteria. <span className="text-green-600">Try Another Visualization?</span></div>}
                <Button style={{'margin-bottom':'4em'}} onClick={() => navigate('/form')} variant="contained" startIcon={<ArrowBackIosNewIcon/>}>Go Back</Button>

            </div>
        </AnimatedPage>   
    )
}


export default Output;