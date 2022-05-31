import AnimatedPage from "./AnimatedPage";
import '../styles/Output.css';
import { useState } from "react";

const Output = ({params}) => {
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