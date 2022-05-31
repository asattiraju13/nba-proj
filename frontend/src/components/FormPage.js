import '../styles/Form.css';
import AnimatedPage from './AnimatedPage';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, Box, Checkbox, NativeSelect, Slider, Radio, RadioGroup} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomSelect = ({params, setParams, name, columns, id}) => {

    const change = (event) => {
        const e = document.getElementById(id);
        const val = e.options[e.selectedIndex].value

        let state_dup = {...params};
        state_dup[name] = val

        setParams(state_dup)
        // console.log(params);
    }
    return (
        <FormControl required>
            <NativeSelect
                inputProps={{
                name: name,
                id: id,
                }}
                onChange={change}
                >
                {
                    columns.map((col, i) => <option key={i} value={col.field}>{col.headerName}</option>)
                }
            </NativeSelect>
        </FormControl>
)
}

const RangeSlider = ({min, max, params, setParams, id}) => {
    const [value, setValue] = useState([min, max]);
    const minDistance = 1;
  
    const handleChange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      let dup = {...params.filter_num}
  
      if (activeThumb === 0) {
        dup[id]['min'] = Math.min(newValue[0], value[1] - minDistance)
        dup[id]['max'] = value[1]
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        dup[id]['min'] = value[0]
        dup[id]['max'] = Math.max(newValue[1], value[0] + minDistance)
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }

      let dup_params = {...params}
      dup_params['filter_num'] = dup
      setParams(dup_params)
    };
  
    return (
        <Slider
          value={value}
          id={id}
          min={min}
          max={max}
          onChange={handleChange}
          valueLabelDisplay="auto"
          className='ml-4'
        />
    );
  }

const SliderSection = ({params, setParams}) => {
    const [checked, setChecked] = useState([true, true, true, true, true])
    const positions = ["Guard","Guard/Forward","Forward","Forward/Center","Center"]

    const handlePos = (event) => {
        const pos = event.target.value
        let dup = [...checked]
        const idx = positions.indexOf(pos)
        dup[idx] = !checked[idx]

        if (dup[idx]) {
            let prev_pos = [...params.filter_pos]
            prev_pos.push(pos)
            setParams({...params,filter_pos:prev_pos})
        } else {
            let prev_pos = [...params.filter_pos]
            prev_pos = prev_pos.filter(posi => posi != pos)
            setParams({...params,filter_pos:prev_pos})
        }
        setChecked(dup)
        console.log(params)
    }


    return (
        <div className='h-40 overflow-scroll'>
            <FormControl required>
                <div className='text-indigo-400 font-bold mb-1'>Select Certain Positions</div>
                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: '0.75em'}}>
                    <FormControlLabel value="Guard" label="Guard" control={<Checkbox checked={checked[0]} onChange={handlePos}/>} />
                    <FormControlLabel value="Guard/Forward" label="Guard/Forward" control={<Checkbox checked={checked[1]} onChange={handlePos}/>}/>
                    <FormControlLabel value="Forward" label="Forward" control={<Checkbox checked={checked[2]} onChange={handlePos}/>} />
                    <FormControlLabel value="Forward/Center" label="Forward/Center" control={<Checkbox checked={checked[3]} onChange={handlePos}/>} />
                    <FormControlLabel value="Center" label="Center" control={<Checkbox checked={checked[4]} onChange={handlePos}/>} />
                </Box>
                <div className='mb-1' >&nbsp;</div>

                <div className='text-indigo-400 font-bold mb-2'>Filter Points per Game</div>
                <RangeSlider min={1} max={23} params={params} setParams={setParams} id={'pts_per_g'}/>
                <div className='mb-1' >&nbsp;</div>

                <div className='text-indigo-400 font-bold mb-2'>Filter Rebounds per Game</div>
                <RangeSlider min={0} max={13} params={params} setParams={setParams} id={'trb_per_g'}/>
                <div className='mb-1' >&nbsp;</div>

                <div className='text-indigo-400 font-bold mb-2'>Filter Assists per Game</div>
                <RangeSlider min={0} max={9} params={params} setParams={setParams} id={'ast_per_g'}/>
            </FormControl>
        </div>
    )
    
}

const Form = ({params, setParams, columns}) => {
    const navigate = useNavigate();

    const [isBox, setIsBox] = useState(true);

    function selectChange(event) {
        if (event.target.value == 'box') {
            setIsBox(true);
        } else {
            setIsBox(false);
        }
        setParams({...params, 'type': event.target.value})
        console.log(params);
    }

    const submitForm = (event) => {
        event.preventDefault();
        navigate('/plot');
    }
    

    return (
        <div className='mt-16 flex flex-col items-center mb-16'>

            <header className='text-center text-5xl font-bold text-indigo-400 mb-12'>Form</header>


            <form onSubmit={submitForm} className='flex flex-col w-1/5'>
                <FormControl required>
                    <div className='text-indigo-400 font-bold text-xl mb-2'>Choose your Plot Type</div>
                    <RadioGroup
                        row
                        aria-labelledby="plot-type-label"
                        name="plot-type-label"
                        defaultValue={"box"}
                        className='mb-8 flex flex-row justify-around'>
                        <FormControlLabel value="box" control={<Radio color="primary" />} label="Box Plot" onClick={selectChange}/>
                        <FormControlLabel value="bar" control={<Radio />} label="Bar Plot" onClick={selectChange}/>
                    </RadioGroup>
                </FormControl>

                <div className='text-indigo-400 font-bold text-xl mb-2'>X-axis Variable</div>

                <CustomSelect params={params} setParams={setParams} name={'y_var'} id={'y_var_id'} columns={[columns[1]].concat(columns.slice(3,5))}/>

                <div className='mb-4' >&nbsp;</div>

                {isBox && <div className='text-indigo-400 font-bold text-xl mb-2'>Y-axis Variable</div>}
                {!isBox && <div className='text-indigo-400 font-bold text-xl mb-2'>Y-axis Variable (Displays Means)</div>}

                <CustomSelect params={params} setParams={setParams} name={'y_var'} id={'y_var_id'} columns={columns.slice(5)}/>

                <div className='mb-4' >&nbsp;</div>

                <div className='text-indigo-400 font-bold text-xl mb-3'>Filter the Data</div>

                <SliderSection params={params} setParams={setParams}/>

                <div className='mb-4' >&nbsp;</div>

                <Button type='submit' variant='contained'>Submit</Button>
            </form>
        </div>
    )
}

const FormPage = ({params, setParams}) => {
    const [data, setData] = useState([]);

    const columns = [
        { field: 'year', headerName: 'Year', width: 100 },
        { field: 'pick', headerName: 'Pick #', width: 100 },
        { field: 'team_id', headerName: 'Team' },
        { field: 'pos', headerName: 'Position', width: 150 },
        { field: 'player', headerName: 'Player', width: 150 },
        { field: 'mp_per_g', headerName: 'Mins per Game' },
        { field: 'efg_pct', headerName: 'Effective Field Goal %' },
        { field: 'pts_per_g', headerName: 'Points per Game' },
        { field: 'trb_per_g', headerName: 'Rebounds per Game' },
        { field: 'ast_per_g', headerName: 'Assists per Game' },
        { field: 'ws', headerName: 'Win Shares' },
        { field: 'bpm', headerName: 'Box Score +/-', width: 100 }
    ]

    useEffect(() => {
        axios.get('http://localhost:3001/form').then(response => {
            setData(response.data);
        }).catch(error => {
            console.log(error);
            alert("Data not available to show in table!");
        })
    }, [])

    return (
        <AnimatedPage>
            <div className="form min-h-screen
            text-white flex flex-col">
                <div className='flex flex-col items-center'>
                    <header className="text-5xl font-bold mt-15 pt-10 mb-10 text-center">
                        Data Description
                    </header>
                    <h2 className='text-center w-1/2 text-xl break-words'>The data consists of recorded rookie statistics, listed below, for the top 10 picks among NBA drafts from 2001 - 2020. See the data below, and scroll down to enter visualization parameters.</h2>
                </div>
                <DataGrid className='m-16 mt-10 bg-white'
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]} />
            </div>
            <Form params={params} setParams={setParams} columns={columns}/>

        </AnimatedPage>
    )
}

export default FormPage;