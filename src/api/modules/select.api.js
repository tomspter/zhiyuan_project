export default ({ request }) => ({
  getYxdmSelect (data) {
    return request({
      url: '/getYxdmSelect',
      method: 'post',
      data
    })
  },
  getSsdmSelect (data) {
    return request({
      url: '/getSsdmSelect',
      method: 'post',
      data
    })
  },
  getSjnfSelect (data) {
    return request({
      url: '/getSjnfSelect',
      method: 'post',
      data
    })
  },
  getPrevPcdmSelect (data) {
    return request({
      url: '/getPrevPcdmSelect',
      method: 'post',
      data
    })
  },
  getZyzdmSelect (data) {
    return request({
      url: '/getZyzdmSelect',
      method: 'post',
      data
    })
  }
})
