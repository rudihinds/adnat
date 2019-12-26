
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import API from './adapters/API';

const useStyles = makeStyles({
  table: {
    maxWidth: 1000,
  },
});

function ShiftsTable(props) {
  const classes = useStyles();
  const [shifts, setShifts] = React.useState([])
  const [shift, setShift] = React.useState({
    shift_date: '',
    start_time: '',
    shift_finish: '',
    break_length: '',
  })
  const [errors, setErrors] = React.useState([])
  const [newShift, setNewShift] = React.useState({})
  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])



  useEffect(() => {
    const fetchData = async () => {
      API.getShifts(props.organisation.id)
        .then(result => {
          setSearchResults(result)
          setShifts(result) 
        })
    }
    fetchData()
  }, [newShift])

  useEffect(() => {
    const results = shifts.filter(shift => 
      shift.employee_name.toLowerCase().includes(searchTerm))
    setSearchResults(results)
  }, [searchTerm])

  const handleLogout = () => {
    props.logout()
    props.toggleViewShifts()
  }

  const handleChange = (key, value) => {
    setShift({
      ...shift,
      [key]: value
    })
  }

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClick = () => {
    let errors = []
    if (shift.shift_date === '') errors.push('Shift date cannot be blank')
    if (shift.start_time === '') errors.push('Start time cannot be blank')
    if (shift.shift_finish === '') errors.push('Shift finish cannot be blank')
    if (shift.break_length === '') errors.push('Break length cannot be blank')

    if (errors.length !== 0) {
      setErrors( errors )
    } else {
      API.createShift(shift, props.currentUser.id)
        .then(shift => setNewShift(shift))  
    }
      
  }

  return (
    <div>
    <div>
      <h1>Adnat</h1>
      <p>Logged in as {props.currentUser.name}  <span style={{textDecoration: 'underline', color:'blue'}} onClick={handleLogout}>Log Out</span> </p>
      <h2>{props.organisation.name}</h2>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

    </div>
    <TableContainer >
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell align="center">Shift Date</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">Finish Time</TableCell>
            <TableCell align="center">Break length (minutes)</TableCell>
            <TableCell align="center">Hours Worked</TableCell>
            <TableCell align="center">Shift Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map(s => (
            <TableRow key={s.name} className={classes.table}>
              <TableCell component="th" scope="s">
                {s.employee_name}
              </TableCell>
              <TableCell align="left">{s.shift_date}</TableCell>
              <TableCell align="left">{s.start_time}</TableCell>
              <TableCell align="left">{s.shift_finish}</TableCell>
              <TableCell align="left">{s.break_length}</TableCell>
              <TableCell align="left">{s.hours_worked}</TableCell>
              <TableCell align="left">${s.shift_cost}</TableCell>
            </TableRow>
          ))}
          <TableRow className={classes.table}>
              <TableCell component="th" scope="row">{props.currentUser.name}</TableCell>
              <TableCell align="left"><input required={true} type='date' onChange={(e) => handleChange('shift_date', e.target.value)} ></input></TableCell>
              <TableCell align="left"><input required={true} type='time' onChange={(e) => handleChange('start_time', e.target.value)}></input></TableCell>
              <TableCell align="left"><input required={true} type='time' onChange={(e) => handleChange('shift_finish', e.target.value)}></input></TableCell>
              <TableCell align="left"><input required={true} type='number' onChange={(e) => handleChange('break_length', e.target.value)}></input></TableCell>
              <TableCell align="left"><button required={true} type='submit' onClick={handleClick}>create shift</button></TableCell>
              
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}






    


export default ShiftsTable;