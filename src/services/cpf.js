const axios = require('axios')

const api = 'http://localhost:3000/cpf?'

const getQueryString = (filters) => Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&')

const get = query => axios.get(api + getQueryString(query)).then(res => res.data.cpfs)

const createOrUpdate = data => axios.post(api, data).then(res => res.data.cpf)

const remove = data => axios.delete(api, { data }).then(res => res.status === 200)

export default {
  get,
  createOrUpdate,
  remove
}
