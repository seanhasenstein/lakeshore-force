const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLList } = graphql;
const User = mongoose.model('user');
const Team = mongoose.model('team');
const Athlete = mongoose.model('athlete');
const Coach = mongoose.model('coach');
const Calendar = mongoose.model('calendar');
const Article = mongoose.model('article');
const ContactForm = mongoose.model('contactForm');
const UserType = require('./types/user_type');
const TeamType = require('./types/team_type');
const CalendarType = require('./types/calendar_type');
const AthleteType = require('./types/athlete_type');
const ArticleType = require('./types/article_type');
const CoachInputType = require('./types/coach_type');
const TagInputType = require('./types/tag_type');
const ContactFormType = require('./types/contactForm_type');
const Authenticate = require('../middleware/authenticate');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				username: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { username, password }, req) {
				return Authenticate.createUser({ username, password, req });
			}
		},
		deleteUser: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return User.findByIdAndRemove({ _id: id });
			}
		},
		addTeam: {
			type: TeamType,
			args: {
				name: { type: GraphQLString },
				coaches: { type: GraphQLList(CoachInputType) }
			},
			resolve(parentValue, args) {
				return Team.addTeam(args);
			}
		},
		addArticle: {
			type: ArticleType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				timeStamp: { type: GraphQLString },
				body: { type: new GraphQLNonNull(GraphQLString) },
				tags: { type: GraphQLList(TagInputType) }
			},
			resolve(parentValue, args) {
				return Article.addArticle(args);
			}
		},
		deleteTeam: {
			type: TeamType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Team.findByIdAndRemove({ _id: id });
			}
		},
		editTeam: {
			type: TeamType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				slug: { type: GraphQLString },
				name: { type: GraphQLString },
				coaches: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return Team.findByIdAndUpdate(args.id, args, { new: true });
			}
		},
		deleteAthlete: {
			type: AthleteType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Athlete.findByIdAndRemove({ _id: id });
			}
		},
		editAthlete: {
			type: AthleteType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				jerseyNumber: { type: GraphQLInt },
				city: { type: GraphQLString },
				highSchool: { type: GraphQLString },
				teamId: { type: GraphQLID }
			},
			resolve(parentValue, args) {
				return Athlete.findByIdAndUpdate(args.id, args, { new: true });
			}
		},
		addAthleteToTeam: {
			type: TeamType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: new GraphQLNonNull(GraphQLString) },
				teamId: { type: GraphQLID },
				jerseyNumber: { type: GraphQLInt },
				highSchool: { type: GraphQLString },
				city: { type: GraphQLString },
				state: { type: GraphQLString },
			},
			resolve(parentValue, args) {
				return Team.addAthlete(args.teamId, args);
			}
		},
		addCoachToTeam: {
			type: TeamType,
			args: {
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				teamId: { type: GraphQLID }
			},
			resolve(parentValue, args) {
				return Team.addCoach(args.teamId, args);
			}
		},
		addCalendarEvent: {
			type: CalendarType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				date: { type: new GraphQLNonNull(GraphQLString) },
				streetAddress: { type: GraphQLString },
				city: { type: GraphQLString },
				state: { type: GraphQLString },
				zipCode: { type: GraphQLInt },
				websiteURL: { type: GraphQLString },
				twitterURL: { type: GraphQLString },
				teamId: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return Calendar.addCalendarEvent(args.teamId, args);
			}
		},
		sendContactForm: {
			type: ContactFormType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
				message: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parentValue, args) {
				return ContactForm.sendContactFormMessage(args);
			}
		}
	}
});

module.exports = mutation;
