const { publish } = require('../utils')
const { CREATED, UPDATED, DELETED } = require('./channels')

const createPost = (_, { input }, { db, pubsub }, info) => {
  const post = {
    ...input,
    id: db.POSTS.length + 1
  }
  db.POSTS = [...db.POSTS, post]
  publish('POST', CREATED, post, pubsub)
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
  publish('POST', UPDATED, post, pubsub)
  return post
}

const deletePost = (_, { id, input }, { db, pubsub }, info) => {
  const post = db.POSTS.find(p => p.id === id)
  if (!post) {
    throw new Error(`Post with id '${id}' not found!`)
  }
  db.POSTS = db.POSTS.filter(p => p.id !== post.id)
  publish('POST', DELETED, post, pubsub)
  return post
}

module.exports = {
  createPost,
  updatePost,
  deletePost
}