import React from 'react';
import Landing from './Landing';
import Form from './Form';
import Output from './Output';
import {Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes(props) {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element = {<Landing/>} />
                <Route path='/form' element = {<Form/>}/>
                <Route path='/plot' element = {<Output/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;