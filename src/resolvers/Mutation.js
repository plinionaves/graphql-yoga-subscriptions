const { CREATED, UPDATED } = require('./channels')

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

const updatePost = (_, { id, input }, { db, pubsub }, info) => {
  const index = db.POSTS.findIndex(p => p.id === id)
  if (index < 0) {
    throw new Error(`Post with id '${id}' not found!`)
  }
  const post = { ...input, id }
  const newPosts = [...db.POSTS]
  newPosts[index] = post
  db.POSTS = newPosts
  pubsub.publish(`POST_${UPDATED}`, {
    post: {
      mutation_in: UPDATED,
      node: post
    }
  })
  return post
}

module.exports = {
  createPost,
  updatePost
}