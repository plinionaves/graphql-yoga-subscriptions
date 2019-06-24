const { postChannels } = require('./channels')

const Post = {
  subscribe: (_, args, { pubsub }) =>
    pubsub.asyncIterator(Object.keys(postChannels))
}

module.exports = {
  Post
}