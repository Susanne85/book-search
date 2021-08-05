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
                    console.log('User credentials', token, user);
                    return { token, user };
                }
                throw new AuthenticationError('User could not be created, try again later!');
            }
        },
        login: async (parent, { email, password },) => {
            console.log('Server Login', email, password );
            const user = await User.findOne({ email });
            console.log('Server Login Found User', user );
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            console.log('Server Login Token', token );
            console.log('Server Login User', user );
            return { token, user };
        },
        // removeBook: async (_, { id }, context) => {
            
        //     const result = await User.findOneAndUpdate({ _id: id })

        //     if (!result)
        //         return {
        //             success: false,
        //             message: 'failed to delete book',
        //         };
        //     return {
        //         success: true,
        //         message: 'book deleted',
        //         book: [book],
        //     }
        // },
         saveBook: async (_, { bookData }, context) => {

           //  const result = await User.findOne({ _id: id })
             console.log('save Book', bookData);

            //  if (!result)
            //      return {
            //          success: false,
            //          message: 'failed to delete book',
            //      };
            //  return {
            //      success: true,
            //      message: 'book deleted',
            //      book: [book],
            //  };
         }

    }
}
module.exports = resolvers;
