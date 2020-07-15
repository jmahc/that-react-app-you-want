import { saveToken, removeToken } from './LocalStorage'
import { Redirect } from 'react-router-dom'

function postApi(url = '', postBody = {}) {
  return { data: true }
}

const URL = process.env.API_URL + '/auth'

/**
 * The login method for user authentication that grants access to certain sections of the application.
 * @param {Object{Username:String, Password: String}} payload The user's login credentials including username and password.userCredentials
 * @param {Function} clearForm Callback function to clear the form.
 * @returns {Object} On success: Includes a data object of the user alongside a JWT.  On failure, it will return an error message suggesting they attempt to login again.
 */
export async function logIn(payload, clearForm) {
  const { email, password } = payload
  console.log('Email: ', email)
  console.log('Passowrd: ', password)
  try {
    // const response = await post(URL + '/login', {
    //   username,
    //   password,
    // })

    // Validate user exists
    // const user = await authenticate("signup", payload)
    // if (user) // instead of email
    if (email === 'admin@gmail.com') {
      saveToken('abcdefg123') // response.data.token)
      clearForm()
    }

    // return { post_success: true }
    window.location = '/private'
  } catch (err) {
    console.error(err)
    console.log('Failed to log in!')
    return { post_success: false }
  }
}

export const logOut = () => {
  removeToken()
  location.reload()
}
