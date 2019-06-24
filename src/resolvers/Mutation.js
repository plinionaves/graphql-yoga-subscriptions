const { postChannels } = require('./channels')

const createPost = (_, { input }, { db, pubsub }, info) => {
  const post = {
    ...input,
    id: db.POSTS.length + 1
  }
  db.POSTS = [...db.POSTS, post]
  pubsub.publish(postChannels.POST_CREATED, { post })
  return post
}

module.exports = {
  createPost
}