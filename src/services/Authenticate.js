import { saveToken, removeToken } from './LocalStorage'

function postApi(url = '', postBody = {}) {
  return { data: true }
}

const URL = process.env.API_URL + '/auth'

/**
 * The login method for user authentication that grants access to certain sections of the application.
 * @param {Object{Username:String, Password: String}} userCredentials The user's login credentials including username and password.userCredentials
 * @returns {Object} On success: Includes a data object of the user alongside a JWT.  On failure, it will return an error message suggesting they attempt to login again.
 */
export async function login(userCredentials) {
  const { username, password } = userCredentials
  try {
    const response = await post(URL + '/login', {
      username,
      password,
    })
    saveToken(response.data.token)

    return { post_success: true }
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
