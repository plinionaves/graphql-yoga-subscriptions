const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')
const pubsub = require('./config/pubsub')
const { POSTS } = require('./mocks/posts')

const { PORT: port = 4444 } = process.env

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: {
    db: { POSTS },
    pubsub
  }
})

server.start({
  port
}).then(() => console.log(`Listening at port ${port}...`))