const dev = false

module.exports = {
  BASE_URL: 'https://pomonatodo.herokuapp.com',
  ENDPOINT: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ALL_TODO: '/todo/user',
    CREATE_TODO: '/todo',
    DETAIL_TODO: '/todo/:id',
    UPDATE_TODO: '/todo',
    DELETE_TODO: '/todo/:id'
  }
}
