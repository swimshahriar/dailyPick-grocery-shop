// cases for switch case
export const Login = 'Login';
export const Logout = 'Logout';
export const Register = 'Register';

// login function
const login = (userId, token, email) => {
  // save to the localstorage
  localStorage.setItem(
    'userData',
    JSON.stringify({
      userId,
      email,
      token,
    })
  );

  return { userId, token, email };
};

// logout function
const logout = (state) => {
  // removing data from localstorage
  localStorage.removeItem('userData');

  return { userId: null, token: null, email: null };
};

// auth reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case Login:
      return login(action.userId, action.token, action.email);
    case Logout:
      return logout(state);
    default:
      return 'action not allowed!';
  }
};
