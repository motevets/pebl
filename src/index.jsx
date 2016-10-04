import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TodoAppContainer} from './components/TodoApp';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import 'todomvc-app-css/index.css';


const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreDevTools(reducer);

const config = {
  apiKey: 'AIzaSyAOeqHO3CwN45KNkKyVZbLn5fCi1O5LIB0',
  authDomain: 'pebl-68385.firebaseapp.com',
  databaseURL: 'https://pebl-68385.firebaseio.com'
}
firebase.initializeApp(config);
firebase.auth().signInAnonymously();
let todosRef = firebase.database().ref('todos');
todosRef.on('value', function(data) {
  console.log('==================');
  const todos = []
  data.forEach( (todoSnapshot) => {
    const todo = todoSnapshot.exportVal();
    todo.id = todoSnapshot.key;
    todos.push(todo);
  });
  debugger;
  store.dispatch({
    type: 'SET_STATE',
    state: {
      todos: todos,
      filter: 'all'
    }
  });
});
firebase.database().ref('todos').once('value').then(function(todos) {
  console.log(todos.val());
});
// store.dispatch({
//   type: 'SET_STATE',
//   state: {
//     todos: [
//       {id: 1, text: 'React', status: 'active', editing: false},
//       {id: 2, text: 'Redux', status: 'active', editing: false},
//       {id: 3, text: 'Immutable', status: 'active', editing: false},
//     ],
//     filter: 'all'
//   }
// });

ReactDOM.render(
  <Provider store={store}>
    <TodoAppContainer />
  </Provider>,
  document.getElementById('app')
);
