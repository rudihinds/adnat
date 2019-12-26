import React from 'react'
import API from './adapters/API'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


class SignUpForm extends React.Component {
  state = {
    user: {
      name: '',
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
    if (this.state.user.name === '') errors.push('The name cannot be blank')
    if (this.state.user.email === '') errors.push('The email cannot be blank')
    if (this.state.user.password === '') errors.push('The password cannot be blank')
    
    if (errors.length !== 0) {
      this.setState({ errors })
    } else {
      API.signUp(this.state.user).then(data => {
        console.log(data)
        if (data.errors) this.setState({errors: data.errors})
        if (data.user) {

        }
        this.setState({
          user: {
          name: '',
          email: '',
          password: ''
          },
          errors: []
        }, this.props.handleSignUp(data))

      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div style={{padding: '10px'}}>
      <p>Sign up for an account</p>
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        {this.state.errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
        <div>
          <label htmlFor='name' >name</label>
          <input type='text' id='name' name='name' required={true} value={this.state.user.name} onChange={(e) => this.handleChange('name', e.target.value)} />
        </div>
        <div>
          <label htmlFor='email' >Email</label>
          <input type='email' id='email' name='email' required={true} value={this.state.user.email} onChange={(e) => this.handleChange('email', e.target.value)} />
        </div>
        <div>
          <label htmlFor='Password'>Password</label>
          <input type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <hr/>
      <p onClick={this.props.handleClick}>If you already have an account, click here to login.</p>
      </div>
    )
  }
}

export default SignUpForm;