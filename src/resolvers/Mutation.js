const { CREATED } = require('./channels')

const createPost = (_, { input }, { db, pubsub }, info) => {
  const post = {
    ...input,
    id: db.POSTS.length + 1
  }
  db.POSTS = [...db.POSTS, post]
  pubsub.publish(`POST_${CREATED}`, {
    post: {
      mutation_in: CREATED,
      node: post
    }
  })
  return post
}

module.exports = {
  createPost
}