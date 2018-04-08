const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const AthleteType = require('./athlete_type');

const Team = mongoose.model('team');

const CoachType = new GraphQLObjectType({
  name: 'CoachType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

const TeamType = new GraphQLObjectType({
  name: 'TeamType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    coaches: { type: new GraphQLList(CoachType) },
    athletes: {
      type: new GraphQLList(AthleteType),
      resolve(parentValue) {
        return Team.findAthletes(parentValue.id);
      },
    },
  }),
});

module.exports = CoachType;
module.exports = TeamType;
