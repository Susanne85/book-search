const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_,args,context,info) => {
            //Need to get current ID
            //Call JWT to get token to get ID 
            //console.log('me', args, context,info);
            console.log('Context', context.user);
           
            const user = await User.findOne({})
            return user;
        },
    },
    Mutation: {
        login: async (_, { username, email, password }) => {
            let user;
            user = await User.findOne({email, password});

            if(!user){
                user = await User.create({
                    username,
                    email,
                    password,
                })
            }
            
            if (user) {
                const token = signToken(user);
                return {token,user};
            }
            throw new Error("Cannot create or find user, please fix this bug");
        },

        addUser: async (_, { username, email, password }) => {
            const user = await User.Create({ username, email, password });
            if (user) {
                const token = signToken(user);
                return {token,user};
            }
        },

        saveBook: async (_, { bookData }) => {
            //Do we need to get the UserID so that we pass in just UserId and Books
            //Do we add the input data to User.savedBooks

            const result = await User.findOneAndUpdate({ bookData });
            return {
                success: true,
                message: 'Help',
                user: user,
            };
        },
        deleteBook: async (_, { id }) => {

            //Do we need to get the UserID and pass in UserID and id (of book)
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
            };
        },
    }
}

module.exports = resolvers;
