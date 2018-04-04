const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const Athlete = mongoose.model('athlete');

const AthleteType = new GraphQLObjectType({
	name: 'AthleteType',
	fields: () => ({
		id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		jerseyNumber: { type: GraphQLInt },
		highSchool: { type: GraphQLString },
		city: { type: GraphQLString },
		state: { type: GraphQLString },
		team: {
			type: require('./team_type'),
			resolve(parentValue) {
				return Athlete.findById(parentValue).populate('teamId')
					.then(athlete => athlete.teamId);
			}
		}
	})
});

module.exports = AthleteType;
