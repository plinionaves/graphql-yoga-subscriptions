const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')

const { PORT: port = 4444 } = process.env

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers
})

server.start({
  port
}).then(() => console.log(`Listening at port ${port}...`))