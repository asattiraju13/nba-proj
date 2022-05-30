import '../styles/Form.css';
import AnimatedPage from './AnimatedPage';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {DataGrid} from '@mui/x-data-grid'
import { useEffect, useState } from 'react';

const Form = () => {
}

const FormPage = () => {
    const [data, setData] = useState([]);
    
    const columns = [
        {field:'year', headerName:'Year', width: 100},
        {field:'pick', headerName:'Pick #', width: 100},
        {field:'team_id', headerName:'Team'},
        {field:'pos', headerName:'Position',width: 150},
        {field:'player', headerName:'Player',width: 150},
        {field:'mp_per_g', headerName:'Mins per Game'},
        {field:'efg_pct', headerName: 'Effective Field Goal %'},
        {field:'pts_per_g', headerName: 'Points per Game'},
        {field:'trb_per_g', headerName: 'Rebounds per Game'},
        {field:'ast_per_g', headerName: 'Assists per Game'},
        {field:'ws', headerName: 'Win Shares'},
        {field:'bpm', headerName: 'Box Score +/-',width: 100}
    ]

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:3001/form').then(response => {
            setData(response.data);
        }).catch(error => {
            console.log(error);
            alert("Data not available to show in table!");
        })
    },[])

    return (
        <AnimatedPage>
            <div className="form min-h-screen
            text-white flex flex-col">
                <div className='flex flex-col items-center'>
                    <header className="text-5xl font-bold mt-15 pt-10 mb-10 text-center">
                        Data Description
                    </header>
                    <h2 className='text-center w-1/2 text-xl break-words'>The data consists of recorded career statistics, listed below, for the top 10 picks among NBA drafts from 2001 - 2020. See the data below, and scroll down to enter visualization parameters.</h2>
                </div>
                <DataGrid className='m-10 bg-white'
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[100]}/>
            </div>   

        </AnimatedPage> 
    )
}

export default FormPage;