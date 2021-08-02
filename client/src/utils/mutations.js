import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email:String!,$password:String!){
  login(email:$email,password:$password){
    token
    user {
      _id
      username
    }
  }
}
`;

 export const ADD_USER = gql`
 mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
 `;

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
