import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import API from './adapters/API'



function JoinOrgForm(props) {

  const [hourlyRate, setHourlyRate] = React.useState('');
  const [orgName, setOrgName] = React.useState('');

  const handleJoin = (org, user) => {
    API.joinOrg(org.id, user.id)
    props.setOrganisation(org.id)
  }

  const handleName = (value) => {
    setOrgName(value)
  }

  const handleHourlyRate = (value) => {
    setHourlyRate(value)
  }

  const handleSubmit = (e) => {
    API.createOrg(orgName, hourlyRate)
      .then(data => {
        props.setOrganisation(data.user.organisation_id)
        props.addNewOrganisation(data.org)
      })
  }

  const handleEditButton = (index) => {
    props.addSelectedOrgId(index)

    
  }
  
  return (
            <Container style={{marginBottom: 50}} >
            <h1>Adnat</h1>
            <p>Logged in as {props.currentUser.name}  <span style={{textDecoration: 'underline', color:'blue'}} onClick={() => props.logout()}>Log Out</span></p>
            <p>You aren't currently connected to any organisations, join an existing one or create a new one</p>
            <h2>Organisations</h2>

            <Container>
            {props.allOrganisations.map((org, i) => (
                <li key={i+1}>{org.name}  
                  <Button id={org.id} onClick={() => handleEditButton(org.id)}>edit</Button>
                  <Button onClick={() => handleJoin(org, props.currentUser)}>join</Button>
                </li>
            ))}
            </Container>
            <h2>Create Organisation</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name'>Name: </label>
                <input style={{border: '1px solid grey'}} type='text' id='name' name='name' required={true} value={orgName} onChange={(e) => handleName(e.target.value)} />
              </div>
              <div style={{flexDirection:"row"}}>
                <label htmlFor='hourlyRate' >Hourly Rate: $</label>
                <input style={{border: '1px solid grey'}} type='text' id='hourlyRate' name='hourly rate' required={true} value={hourlyRate} onChange={(e) => handleHourlyRate(e.target.value)} />
              </div>
              <div>
                <Button variant="contained" color="primary" type='submit'>Create and Join</Button>
              </div>
          </form>
            </Container>
  );
}

export default JoinOrgForm;

