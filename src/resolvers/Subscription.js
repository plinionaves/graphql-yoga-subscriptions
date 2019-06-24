const { withFilter } = require('graphql-yoga')

const post = {
  subscribe: withFilter(
    (_, { where }, { pubsub }) => {
      const channels = where.mutation_in.map(c => `POST_${c}`)
      return pubsub.asyncIterator(channels)
    },
    (payload, variables, ctx, info) => true
  )
}

module.exports = {
  post
}