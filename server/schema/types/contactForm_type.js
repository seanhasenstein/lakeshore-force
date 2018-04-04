const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const ContactForm = mongoose.model('contactForm');

const ContactFormType = new GraphQLObjectType({
	name: 'ContactFormType',
	fields: () => ({
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
		message: { type: GraphQLString }
	})
});

module.exports = ContactFormType;
