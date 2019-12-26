import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import API from './adapters/API'


function EditPage(props) {

  const [hourlyRate, setHourlyRate] = React.useState(null);
  const [orgName, setOrgName] = React.useState(null);

  useEffect(() => {
    setHourlyRate(props.selectedOrg.hourly_rate)
    setOrgName(props.selectedOrg.name)
  },[])

   const handleName = (value) => {
    setOrgName(value)
  }

  const handleHourlyRate = (value) => {
    setHourlyRate(value)
  }

  const handleDelete = () => {
    API.deleteOrg(props.selectedOrg.id)
    .then(data => {
      if (data.action === "deleted")
      props.setOrganisation(null)
      props.toggleEditDialogOff()
      props.removeOrganisationFromAllOrgsArr(props.selectedOrg.id)
    })
  }

  const handleSubmit = (e) => {
      API.updateOrg(props.selectedOrg.id, orgName, hourlyRate)
          .then(props.toggleEditDialogOff())
          .then(props.updateOrganisation(props.selectedOrg.id, hourlyRate, orgName))
          e.preventDefault()
    }

  return (
        <Container>
          <h1>Adnat</h1>
        <form onSubmit={handleSubmit}>
        <h2>Edit Organisation</h2>
        <p>Logged in as {props.currentUser.name}  <span style={{textDecoration: 'underline', color:'blue'}} onClick={() => props.logout()}>Log Out</span> </p>
        <div>
          <label htmlFor='name'>Name: </label>
          <input style={{border: '1px solid grey'}} type='text' id='name' name='name' required={true} value={orgName} onChange={(e) => handleName(e.target.value)} />
        </div>
        <div style={{flexDirection:"row"}}>
          <label htmlFor='hourlyRate' >Hourly Rate: $</label>
          <input style={{border: '1px solid grey'}} type='number' id='hourlyRate' name='hourly rate' required={true} value={hourlyRate} onChange={(e) => handleHourlyRate(e.target.value)} />
        </div>
        <div>
          <Button variant="contained" color="primary" type='submit'>Update</Button>
        </div>
        <div>
          <Button variant="contained" color="red" type='button' onClick={() => handleDelete()}>delete</Button>
        </div>
      </form>
        </Container>
  );
}

export default EditPage;