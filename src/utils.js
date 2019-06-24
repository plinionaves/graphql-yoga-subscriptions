const publish = (entity, mutation_in, node, pubsub) =>
  pubsub.publish(`${entity}_${mutation_in}`, {
    [entity.toLowerCase()]:{
      mutation_in,
      node
    }
  })

module.exports = {
  publish
}