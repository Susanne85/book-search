const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            let user;
            user = await User.findOne({ email, password });

            if (!user) {
                const user = await User.create({ username, email, password });
                if (user) {
                    const token = signToken(user);
                    return { token, user };
                }
                throw new AuthenticationError('User could not be created, try again later!');
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        removeBook: async (_, { id }) => {

            const result = await User.findOneAndUpdate({ _id: id })

            if (!result)
                return {
                    success: false,
                    message: 'failed to delete book',
                };
            return {
                success: true,
                message: 'book deleted',
                book: [book],
            }
        },
        saveBook: async (_, { id }) => {

            const result = await User.findOne({ _id: id })
            console.log('save Book', result);

            if (!result)
                return {
                    success: false,
                    message: 'failed to delete book',
                };
            return {
                success: true,
                message: 'book deleted',
                book: [book],
            };
        }

    }
}
module.exports = resolvers;
