const { PubSub } = require('graphql-yoga')

const pubsub = new PubSub()

console.log('Creating 1')

module.exports = pubsub