const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Book {
    bookId:String!
    authors:String!
    title:String!
    description:String!
    image:String
    link:String
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

input BookInput{
    bookId:String!
    authors:String!
    title:String!
    description:String!
    image:String
    link:String
}

type Query{
    me:User
}

type Mutation{
    login(email:String!, password:String! ):Auth
    addUser(username:String!, email:String!, password:String!):Auth
    saveBook(_id:ID!,input:BookInput):User!
    removeBook(bookId:String!):User!
} 

`;

module.exports = typeDefs;