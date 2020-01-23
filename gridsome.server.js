const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {
    const { data } = await axios.get('https://api.github.com/repos/maizzle/framework/releases/latest')

    const collection = actions.addCollection({
      typeName: 'Releases'
    })

    collection.addNode({
      id: data.id,
      tag: data.tag_name,
      url: data.html_url,
    })
  })
}
