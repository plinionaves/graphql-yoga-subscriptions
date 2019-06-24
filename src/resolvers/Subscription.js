const { postChannels } = require('./channels')

const post = {
  subscribe: (_, args, { pubsub }) =>
    pubsub.asyncIterator(Object.keys(postChannels))
}

module.exports = {
  post
}