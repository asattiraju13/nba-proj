import AnimatedPage from "./AnimatedPage";
import '../styles/Output.css';
import axios from 'axios';
import { useEffect, useState } from "react";

const Output = ({params}) => {

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
                <header className="text-5xl font-bold">
                Output
                </header>
            </div> 
        </AnimatedPage>   
    )
}


export default Output;