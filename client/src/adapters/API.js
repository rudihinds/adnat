const apiEndpoint = 'http://localhost:3000/api/v1'
const usersUrl = `${apiEndpoint}/users`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`
const organisationsUrl = `${apiEndpoint}/organisations`
const shiftsUrl = `${apiEndpoint}/shifts`



const jsonify = res => {
  return res.json()     
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
  {
      'Authorization': localStorage.getItem('token'),
      ...moreHeaders
  }
)

const signUp = (user) => fetch(usersUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data.errors}
    } else {
      localStorage.setItem('token', data.token)
      return {user: data.user}
    }
  })
  .catch(handleServerError)


const logIn = (user) => {
  return fetch(loginUrl, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      console.log('errors: ', data.errors)
      return data.errors

    } else {
      localStorage.setItem('token', data.token)
      return {user: data.user}
    }
  })
  // .catch(handleServerError)
}

const validateUser = () => {

  if ((!localStorage.getItem('token')) || (localStorage.getItem('token') === "undefined")) {
    console.log("apparently no token")
    return Promise.resolve({ error: 'no token'})
  }

  return fetch(validateUrl, {
    headers: constructHeaders()
  })
      .then(jsonify)
      .then(data => {
        console.log(data, "token found")
        if (!DataTransfer.error) localStorage.setItem('token', data.token)
        return data
      })
      .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')

const getShifts = (organisation_id) => {
  return fetch(`${organisationsUrl}/${organisation_id}/shifts`, { headers: constructHeaders() })
  .then(resp => resp.json())
}

const getOrgs = () => {
  return fetch(organisationsUrl, { 
    headers: constructHeaders() 
  })
  .then(resp => resp.json()
  .catch(handleServerError)
  )}
  

const joinOrg = (organisation_id, userId) => {
  fetch(`${usersUrl}/${userId}`, {
    method: 'PUT',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ organisation_id: organisation_id })
  })
  // .then(res => res.json())
  // .then(console.log)
}

const updateOrg = (orgId, name, hourly_rate) => {
    return fetch(`${organisationsUrl}/${orgId}`, {
    method: 'PUT',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ 
      organisation: {
        name, 
        hourly_rate
      } 
    })
  })
    .then(res => res.json())
  .then(console.log)
}

const leaveOrg = (org_id, userId) => {
  return fetch(`${usersUrl}/${userId}`, {
    method: 'PUT',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ user: { organisation_id: org_id } })
  })
    .then(res => res.json())
    .then(console.log)
}

const createOrg = (orgName, hourlyRate) => {
  return fetch(organisationsUrl, {
    method: 'POST',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ organisation: { name: orgName, hourly_rate: hourlyRate } })
  }).then(res => res.json())
}

const getCurrentUser = () => {
  return fetch(usersUrl, { headers: constructHeaders() })
  .then(resp => resp.json())
}

const deleteOrg = (orgId) => {
  return fetch(`${organisationsUrl}/${orgId}`, {
    method: 'DELETE',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({organisation_id: orgId})
  })
  .then(res => res.json())
}

const createShift = (shift, userId) => {
  return fetch(shiftsUrl, {
    method: 'POST',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({
      shift,
      user_id: userId
    })
  }).then(jsonify)  
  
}



export default {
  signUp,
  logIn,
  validateUser,
  clearToken,
  getShifts,
  getOrgs,
  joinOrg,
  updateOrg,
  leaveOrg,
  createOrg,
  getCurrentUser,
  deleteOrg,
  createShift
}