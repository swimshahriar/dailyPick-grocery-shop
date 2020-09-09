// cases for switch case
export const Login = 'Login';
export const Logout = 'Logout';
export const Register = 'Register';

// login function
const login = (userId, token) => {
  return { userId, token };
};

// logout function
const logout = (state) => {
  return { userId: null, token: null };
};

// auth reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case Login:
      return login(action.userId, action.token);
    case Logout:
      return logout(state);
    default:
      return 'action not allowed!';
  }
};
