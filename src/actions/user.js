import { createAction } from 'redux-act';

export const changeName = createAction('USER_CHANGE_NAME');
export const changeAge = createAction('USER_CHANGE_AGE');

// import { firestore } from '../firebase';
// export const GET_POSTS = 'GET_POSTS';

// const postsRef = firestore.collection('posts');

// export const getPosts = () => {
//   return dispatch => {
//     postsRef.onSnapshot(snapshot => {
//       dispatch({
//         type: GET_POSTS,
//         payload: snapshot.docs.map(doc => {
//           return { id: doc.id, ...doc.data() };
//         })
//       });
//     });
//   };
// };

// export const savePost = post => {
//   return dispatch => postsRef.add({ ...post });
// };

// export const deletePost = post => {
//   return dispatch => postsRef.doc(post.id).delete();
// };
