import React from 'react'
import API from './adapters/API'

class LoginForm extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: []
  }

  handleChange = (key, value) => {
    this.setState({user: {...this.state.user, [key]: value}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (this.state.user.email === '') errors.push('The email cannot be blank')
    if (this.state.user.password === '') errors.push('The password cannot be blank')

    if (errors.length === 0) {
      this.setState({
        user: {
          email: '',
          password: ''
        },
        errors: []
      })
      
      API.logIn(this.state.user)
        .then(resp => {
          if (resp.errors) {
            this.setState({ errors: resp.errors })
          } else {
            this.props.handleUserLogin(resp);
            this.props.toggleModal();
          }
          
        })
    } else {
      this.setState({ errors })
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div style={{padding: '10px'}}>
        <p>Login to view shifts.</p>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.state.errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
          <div>
            <label htmlFor='email' >email</label>
            <input type='text' id='email' name='email' required={true} value={this.state.user.email} onChange={(e) => this.handleChange('email', e.target.value)} />
          </div>
          <div>
            <label htmlFor='Password'>Password</label>
            <input type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          <hr/>
          <p onClick={this.props.handleClick}>If you do not already have an account, click here to sign up.</p>
        </form>
      </div>
    )
  }
}

export default LoginForm;