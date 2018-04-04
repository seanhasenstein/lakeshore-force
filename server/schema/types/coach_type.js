const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLString, GraphQLInputObjectType, GraphQLNonNull, GraphQLID } = graphql;

const CoachInputType = new GraphQLInputObjectType({
	name: 'CoachInputType',
	fields: () => ({
    id: { type: GraphQLID },
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: new GraphQLNonNull(GraphQLString) }
	})
});

module.exports = CoachInputType;
