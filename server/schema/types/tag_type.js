const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLString, GraphQLInputObjectType } = graphql;

const TagInputType = new GraphQLInputObjectType({
  name: 'TagInputType',
  fields: () => ({
    tag: { type: GraphQLString },
  }),
});

module.exports = TagInputType;
