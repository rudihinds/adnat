import React from 'react';
import './App.css';
import API from './adapters/API'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import JoinOrgForm from './JoinOrgForm'
import ActionPage from './ActionPage'
import EditPage from './EditPage'
import ShiftsTable from './ShiftsTable'


class App extends React.Component {

  state = {
    userLoggedIn: false,
    currentUser: null,
    showModal: true,
    modalLogin: false,
    allOrganisations: [],
    selectedOrgId: null,
    viewEditDialog: false,
    viewShifts: false,
    loginErrors: []
  }

  componentDidMount = () => {
    //checks to see if there is a valid token, if so, sets user in state. if not, state shows no user
    API.validateUser()
      .then(resp => {

        if (resp.user) this.setState({
          userLoggedIn: true, 
          currentUser: resp.user, 
          showModal:false,
          selectedOrgId: resp.user.organisation_id ? resp.user.organisation_id : null
        })
        
      })
    API.getOrgs()
      .then(orgs => {
        this.setState({
          allOrganisations: [...orgs],
        })
      })
    }
  
  toggleModal = () => this.setState({showModal: !this.state.showModal});
  toggleLogin = () => this.setState({modalLogin: !this.state.modalLogin});

  userLogOut = () => {
    API.clearToken();
    this.setState({ userLoggedIn: false})
  }

  handleUserLogin = (data) => {
    if (data.user) {
    this.setState({ 
      userLoggedIn: true,
      currentUser: data.user,
      showModal: false
    })
    this.toggleModal()
  } else {
    this.setState({
      loginErrors: data
    })
  }
  }

  handleSignUp = (data) => {
    this.setState({ 
      showModal: false,
      userLoggedIn: true,
      currentUser: data.user,
      
    })
  }

  setOrganisation = orgId => {
    this.setState({
      selectedOrgId: orgId,
      currentUser: {
        ...this.state.currentUser,
        organisation_id: orgId
      }
      
    })
  }

  addNewOrganisation = (org) => {
    if (org)
    this.setState({
      allOrganisations: [...this.state.allOrganisations, org]
    })
  }

  toggleViewShifts = () => {
    this.setState({
      viewShifts: !this.state.viewShifts
    })
  }

  toggleEditDialogOn = () => {
    this.setState({
      viewEditDialog: true
    })
  }

  toggleEditDialogOff = () => {
    this.setState({
      viewEditDialog: false
    })
  }

  toggleViewShifts = () => {
    this.setState({
      viewShifts: !this.state.viewShifts
    })
  }

  getOrgObj = () => {
    if (this.state.selectedOrgId) {
      const org = this.state.allOrganisations.find(org => org.id === this.state.selectedOrgId)
        return org ? org : null
      } else {
        return null
      }
  }


  toggleActionModal = () => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        organisation_id: null
      }
    })  
  }

  addSelectedOrgId = (selectedOrgId) => {
    this.setState({ selectedOrgId })
    this.toggleEditDialogOn()  
  }

  removeConnections = () => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        organisation_id: null
      },
      selectedOrgId: null
    })  
  }

  updateOrganisation = (orgId, hourly_rate, name) => {
    let newOrg = this.state.allOrganisations.find(org => org.id === orgId)
      newOrg.hourly_rate = hourly_rate
      newOrg.name = name    
  }

  removeOrganisationFromAllOrgsArr = (orgId) => {
    let newOrgs  = this.state.allOrganisations.filter(org => org.id !== orgId)
    this.setState({ allOrganisations: newOrgs })
  }

  logout = () => {
    API.clearToken()
    this.setState({
      userLoggedIn: false,
      currentUser: null
    })
  }
  

  render(){
    const selectedOrg = this.getOrgObj()
  return (
    <div className="App">
      {!this.state.currentUser ? 
      <Dialog
              open={!this.state.userLoggedIn && !this.state.currentUser}
              onClose={this.toggleModal}
            >
              {this.state.modalLogin ? 
                <SignUpForm  
                  handleClick={this.toggleLogin} 
                  toggleModal={this.toggleModal} 
                  handleSignUp={this.handleSignUp} 
                /> 
              : 
                <LoginForm 
                  handleClick={this.toggleLogin} 
                  toggleModal={this.toggleModal} 
                  handleUserLogin={this.handleUserLogin} 
                  loginErrors={this.state.loginErrors}
                />
              }
      </Dialog>  
      :
     <>
      <Dialog
              open={this.state.userLoggedIn && 
                !this.state.currentUser.organisation_id && 
                !this.state.viewEditDialog &&
                !this.state.viewShifts}
            >
                <JoinOrgForm 
                  addSelectedOrgId={this.addSelectedOrgId}
                  toggleEditDialogOn={this.toggleEditDialogOn} 
                  currentUser={this.state.currentUser} 
                  allOrganisations={this.state.allOrganisations} 
                  setOrganisation={this.setOrganisation} 
                  addNewOrganisation={this.addNewOrganisation}
                  logout={this.logout}
                />
      </Dialog>
      <Dialog
              open={this.state.userLoggedIn && 
                this.state.currentUser.organisation_id && 
                !this.state.viewEditDialog &&
                !this.state.viewShifts}
            >
                  <ActionPage 
                    currentUser={this.state.currentUser} 
                    toggleViewShifts={this.toggleViewShifts} 
                    toggleEditDialogOn={this.toggleEditDialogOn} 
                    toggleActionModal={this.toggleActionModal}
                    selectedOrg={selectedOrg}
                    removeConnections={this.removeConnections}
                    logout={this.logout}
                    toggleViewShifts={this.toggleViewShifts}
                  />
                 
      </Dialog>
      <Dialog
              open={this.state.userLoggedIn && 
                    this.state.viewEditDialog}
            >
                <EditPage 
                  currentUser={this.state.currentUser} 
                  toggleViewShifts={this.toggleViewShifts}
                  toggleEditDialogOff={this.toggleEditDialogOff} 
                  selectedOrg={selectedOrg}
                  updateOrganisation={this.updateOrganisation}
                  setOrganisation={this.setOrganisation}
                  removeOrganisationFromAllOrgsArr={this.removeOrganisationFromAllOrgsArr}
                  logout={this.logout}
              />
      </Dialog>
     </>
       }
      
      {this.state.viewShifts ? (
        <ShiftsTable 
          organisation={selectedOrg} 
          currentUser={this.state.currentUser}
          toggleViewShifts={this.toggleViewShifts}
          logout={this.logout} />
      )
      :
      null
      }
    </div>
  );
  }
}

export default App;
