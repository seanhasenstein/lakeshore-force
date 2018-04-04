const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


// Each account includes a username and a password
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	}
});

// The user's password is never saved in plain text.
// Prior to saving the user model, we salt & hash the password.
UserSchema.pre('save', function save(next) {
	const user = this;
	if (!user.isModified('password')) { return next(); }
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) { return next(err); }
			user.password = hash;
			next();
		});
	});
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
