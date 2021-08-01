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

input BookData{
    _id: ID!
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
    login(username:String!, email:String!, password:String! ):Auth
    addUser(username:String!, email:String!, password:String!):Auth
    saveBook(bookData:BookData):BookUpdateResponse!
    deleteBook(bookId:String!):BookUpdateResponse!
    
} 

type BookUpdateResponse {
    success:Boolean!
    message:String
    user:User
}
`;

module.exports = typeDefs;