const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	date: {
		type: String,
		required: true,
	},
	streetAddress: {
		type: String,
	},
	city: {
		type: String,
		trim: true
	},
	state: {
		type: String,
	},
	zipCode: {
		type: Number,
		trim: true
	},
	websiteURL: {
		type: String,
		trim: true,
	},
	twitterURL: {
		type: String,
		trim: true
	},
	teams: [{
		type: Schema.Types.ObjectId,
		ref: 'team'
	}]
});

CalendarSchema.statics.addCalendarEvent = (id, args) => {
	const Calendar = mongoose.model('calendar');
	const Team = mongoose.model('team');
	const calendar = new Calendar(args);
	const idArray = id.split(' ');

	const getTeams = idArray.map(teamId => {
		Team.findById(teamId, '_id')
			.then(team => calendar.teams.push(team))
	});

	Promise.all([getTeams]).then(console.log(getTeams));

	}

	// split.map((teamId) => {
	// 	Team.findById(teamId, '_id')
	// 		.then(team => {
	// 			calendar.teams.push(team);
	// 			console.log(calendar);
	// 		})
	// })
// };

CalendarSchema.statics.findTeams = function(id) {
	return this.findById(id)
		.populate('teams')
		.then(calendar => calendar.teams);
};

mongoose.model('calendar', CalendarSchema);
