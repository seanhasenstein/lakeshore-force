const graphql = require('graphql');
const mongoose = require('mongoose');
const UserType = require('./user_type');
const TeamType = require('./team_type');
const AthleteType = require('./athlete_type');
const ArticleType = require('./article_type');
const CalendarType = require('./calendar_type');

const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const User = mongoose.model('user');
const Athlete = mongoose.model('athlete');
const Team = mongoose.model('team');
const Calendar = mongoose.model('calendar');
const Article = mongoose.model('article');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
    athlete: {
      type: AthleteType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Athlete.findById(id);
      },
    },
    athletes: {
      type: new GraphQLList(AthleteType),
      resolve() {
        return Athlete.find({});
      },
    },
    team: {
      type: TeamType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Team.findById(id);
      },
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve() {
        return Team.find({});
      },
    },
    article: {
      type: ArticleType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Article.findById(id);
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        return Article.find({});
      },
    },
    calendarEvent: {
      type: CalendarType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Calendar.findById(id);
      },
    },
    allCalendarEvents: {
      type: new GraphQLList(CalendarType),
      resolve() {
        return Calendar.find({});
      },
    },
  }),
});

module.exports = RootQueryType;
