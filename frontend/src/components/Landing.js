import '../styles/Landing.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';

const Landing = () => {
    return (
        <AnimatedPage>
            <div className="landing min-h-screen text-center
            text-white flex flex-col items-center justify-center">
                <b className='text-6xl'>Visualize Stats of the Top NBA Draft Picks from 2001 - 2020!</b>
                <Button component = {Link} to='/form' variant="contained" endIcon={<ArrowForwardIosIcon/>}>Get Started</Button>
            </div>
        </AnimatedPage>
    )
}

export default Landing;