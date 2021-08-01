import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email:String!,$password:String!){
  login(email:$email,password:$password){
    token
  }
}
`;

// export const ADD_USER = gql`
// mutation LoginMutation($addUserUsername: String!, $addUserEmail: String!, $addUserPassword: String!) {
//     addUser(username: $addUserUsername, email: $addUserEmail, password: $addUserPassword) {
//       token
//     }
//   }
// `;

// export const SAVE_BOOK = gql`
// mutation SaveBookMutation($saveBookId: ID!, $saveBookInput: BookInput) {
//     saveBook(_id: $saveBookId, input: $saveBookInput) {
//       _id
//     }
//   }
//   `;

// export const REMOVE_BOOK = gql`
//   mutation DeleteBookMutation($deleteBookBookId: String!) {
//     deleteBook(bookId: $deleteBookBookId) {
//       _id
//     }
//   }
//   `;
