const initialState = {
  login: '',
  isLoggedIn: false
}


export default function reducer(store = initialState, { type, payload }) {
  switch (type) {
    case 'AUTH':
      return {
        ...store,
        isLoggedIn: true,
        login: payload
      }
    default:
      return store
  }
}
