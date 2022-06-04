import AnimatedPage from "./AnimatedPage";
import '../styles/Output.css';
import axios from 'axios';
import Plot from 'react-plotly.js'
import { useEffect, useState} from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Output = ({params}) => {

    const navigate = useNavigate();
    const [output, setOutput] = useState([]);

    useEffect(() => {
        const data = JSON.stringify(params);
        const url = "http://localhost:3001/output/" + encodeURIComponent(data);
        
        axios.get(url).then(response => {
            setOutput(response);
        }).catch(error => {
            console.log(error)
            alert('Error in retrieving Data. Possibility that no data matched your queries.')
        })
    },[])
    
    return (
        <AnimatedPage>
            <div className="output min-h-screen text-center
            text-white flex flex-col items-center justify-center">
                <header className="text-5xl font-bold mb-10">
                Output
                </header>
                <Plot
                    className="mb-10 w-3/4"
                    data={[
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {autosize: true, title: params.y_var + " vs. " + params.x_var}}
                />
                <Button onClick={() => navigate('/form')} variant="contained" startIcon={<ArrowBackIosNewIcon/>}>Go Back</Button>

            </div>
        </AnimatedPage>   
    )
}


export default Output;