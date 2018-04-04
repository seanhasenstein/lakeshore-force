const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slug');

const CoachSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	}
})

const TeamSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	slug: {
		type: String,
		trim: true
	},
	athletes: [{
		type: Schema.Types.ObjectId,
		ref: 'athlete'
	}],
	coaches: {
		type: [CoachSchema]
	}
});

TeamSchema.statics.addTeam = function(args) {
	const Team = mongoose.model('team');
	const coaches = args.coaches.map(({ lastName }) => lastName + ' ');
	const teamSlug = slug(args.name + ' ' + coaches, {lower: true, symbols: true});
	const team = new Team({ name: args.name, coaches: args.coaches, slug: teamSlug });
	
	return team.save();
}

TeamSchema.statics.addAthlete = function(id, args) {
	const Athlete = mongoose.model('athlete');

	return this.findById(id)
		.then(team => {
			const athlete = new Athlete(args);
			team.athletes.push(athlete);
			return Promise.all([athlete.save(), team.save()])
				.then(([athlete, team]) => team);
		});
};

TeamSchema.statics.findAthletes = function(id) {
	return this.findById(id)
		.populate('athletes')
		.then(team => team.athletes);
};

TeamSchema.statics.addCoach = function(id, args) {
	const Coach = mongoose.model('coach');

	return this.findById(id)
		.then(team => {
			const coach = new Coach(args);
			team.coaches.push(coach);
			return Promise.all([coach.save(), team.save()])
				.then(([coach, team]) => team);
		});
};

TeamSchema.statics.findCoaches = function(id) {
	return this.findById(id)
		.populate('coaches')
		.then(team => team.coaches);
};

mongoose.model('coach', CoachSchema);
mongoose.model('team', TeamSchema);
