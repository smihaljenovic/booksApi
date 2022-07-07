const base = 'http://127.0.0.1:3333'
const version = 'v1'

export const urlValues = {

  //<editor-fold desc="Auth routes">
  login: {
    method: 'POST',
    url: `${base}/api/${version}/login`
  },
  logout: {
    method: 'GET',
    url: `${base}/api/${version}/logout`
  },
  //</editor-fold>

  //<editor-fold desc="User routes">
  createUser: {
    method: 'POST',
    url: `${base}/api/${version}/users`
  },
  updateUser: {
    method: 'PATCH',
    url: `${base}/api/${version}/users`
  },
  deleteUser: {
    method: 'DELETE',
    url: `${base}/api/${version}/users`
  },
  showUser: {
    method: 'GET',
    url: `${base}/api/${version}/users`
  },
  listUsers: {
    method: 'GET',
    url: `${base}/api/${version}/users`
  },
  //</editor-fold>

  //<editor-fold desc="Book routes">
  createBook: {
    method: 'POST',
    url: `${base}/api/${version}/books`
  },
  updateBook: {
    method: 'PATCH',
    url: `${base}/api/${version}/books`
  },
  deleteBook: {
    method: 'DELETE',
    url: `${base}/api/${version}/books`
  },
  showBook: {
    method: 'GET',
    url: `${base}/api/${version}/books`
  },
  listBooks: {
    method: 'GET',
    url: `${base}/api/${version}/books`
  },
  //</editor-fold>

}
