import React, { useState } from 'react';
import Landing from './Landing';
import FormPage from './FormPage';
import Output from './Output';
import {Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes(props) {
    const [params, setParams] = useState({
        type: "box",
        x_var: "pick",
        y_var: "mp_per_g",
        filter_pos: ["Guard","Guard/Forward","Forward","Forward/Center","Center"],
        filter_num: {'pts_per_g':{'min':1, 'max':23},'trb_per_g':{'min':0,'max':13},'ast_per_g':{'min':0,'max':9}}
    });

    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element = {<Landing/>} />
                <Route path='/form' element = {<FormPage params={params} setParams={setParams} />}/>
                <Route path='/plot' element = {<Output params={params}/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;