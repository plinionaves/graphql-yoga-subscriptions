const createPost = (_, { input }, { db }, info) => {
  const post = {
    ...input,
    id: db.POSTS.length + 1
  }
  db.POSTS = [...db.POSTS, post]
  return post
}

module.exports = {
  createPost
}