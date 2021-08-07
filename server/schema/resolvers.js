const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const bookSchema = require('../models/Book');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
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
        login: async (parent, { email, password },) => {
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
        removeBook: async (_, { bookId }, context) => {

            if (context.user) {
                console.log('Server Context ', bookId);
                const updateUser =
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $pull: { savedBooks: {bookId:bookId} },
                        }
                    )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        saveBook: async (_, { bookData }, context) => {
            if (context.user) {
                const updatedUser =
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $push: { savedBooks: bookData },
                        },
                        {
                            new: true,
                            runValidators: true,
                        }
                    );

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}
module.exports = resolvers;
