const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Book {
    _id: ID!
    bookId:String!
    authors:[Author]
    title:String!
    description:String!
    image:String
    link:String
}

type Author{
    _id:ID!
    name:String
}

type User {
    _id:ID!
    username:String!
    email:String!
    bookCount:String
    savedBooks: [Book]
}

type Auth{
    token:String!
    user:User
}


type Query{
    me:User
}

type Mutation{
    login(email:String!, password:String! ):Auth
    addUser(username:String!, email:String!, password:String!):Auth
   
} 

`;

module.exports = typeDefs;