import fetch from 'fetch'

fetch.BASE_URL = '//api.jscdn.ink'

fetch.inject.request(function (conf) {
  var token = localStorage.getItem('token')
  conf.headers['content-type'] = 'application/json'
  if (token) {
    conf.headers.authorization = token
  }
})

fetch.inject.response(r => r.json())

export default fetch
