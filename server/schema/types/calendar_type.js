const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const TeamType = require('./team_type');
const Calendar = mongoose.model('calendar');

const CalendarType = new GraphQLObjectType({
	name: 'CalendarType',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		date: { type: GraphQLString },
		streetAddress: { type: GraphQLString },
		city: { type: GraphQLString },
		state: { type: GraphQLString },
		zipCode: { type: GraphQLInt },
		websiteURL: { type: GraphQLString },
		twitterURL: { type: GraphQLString },
		teams: {
			type: new GraphQLList(TeamType),
			resolve(parentValue) {
				return Calendar.findTeams(parentValue.id);
			}
		}
	})
});

module.exports = CalendarType;
