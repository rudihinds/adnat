import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import API from './adapters/API'

function ActionPage(props) {

  const handleLeave = (org_id, user_id) => {
   API.leaveOrg(org_id, user_id)
   props.removeConnections()
  }
  
  
  return (
            <Container>
            <h1>Adnat</h1>
            <p>Logged in as {props.currentUser.name}  <span style={{textDecoration: 'underline', color:'blue'}} onClick={() => props.logout()}>Log Out</span> </p>
            {props.selectedOrg ? (
            <h2>{props.selectedOrg.name}
            </h2>):null}
              <Button onClick={props.toggleViewShifts}>View Shifts</Button>
              <Button onClick={props.toggleEditDialogOn}>Edit</Button>
              <Button onClick={() => handleLeave(null, props.currentUser.id)}>Leave</Button>
            </Container>
  );
}

export default ActionPage;