import fetch from 'fetch'

fetch.BASE_URL = '//api.jscdn.ink'

fetch.inject.request(function (conf) {
  conf.headers['content-type'] = 'application/json'
})

fetch.inject.response(r => r.json())

export default fetch
