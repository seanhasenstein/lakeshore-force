const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const Tag = mongoose.model('tag');
const Article = mongoose.model('article');

const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
    tag: { type: GraphQLString }
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    timeStamp: { type: GraphQLString },
    body: { type: GraphQLString },
    tags: { type: new GraphQLList(TagType) }
  })
});

module.exports = TagType;
module.exports = ArticleType;
