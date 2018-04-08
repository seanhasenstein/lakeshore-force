const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

// SerializeUser to provide a token to be saved in the users session.
// Here we are using the user.id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Here we are deserializing the user to return the user object.
// The object is placed on req.user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Here we are using a LocalStrategy to save a username and password.
// This strategy is used whenever a user attempts to login.
passport.use(
  new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, 'Invalid Username');
      }
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, 'Invalid Password');
      });
    });
  })
);

// Creates a new user account (that doesn't already exist)
function createUser({ username, password, req }) {
  const user = new User({ username, password });
  if (!username || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ username })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Username already exists');
      }
      return user.save();
    })
    .then(
      user =>
        new Promise((resolve, reject) => {
          req.login(user, err => {
            if (err) {
              reject(err);
            }
            console.log(user);
            resolve(user);
          });
        })
    );
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ username, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid Username and Password');
      }

      req.login(user, () => resolve(user));
    })({ body: { username, password } });
  });
}

module.exports = { createUser, login };
