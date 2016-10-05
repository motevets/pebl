import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
import 'todomvc-app-css/index.css';
import Immutable from 'immutable';

export default class TodoService {
  get _config() {
    return {
      apiKey: 'AIzaSyAOeqHO3CwN45KNkKyVZbLn5fCi1O5LIB0',
      authDomain: 'pebl-68385.firebaseapp.com',
      databaseURL: 'https://pebl-68385.firebaseio.com'
    }
  }

  constructor(store) {
    this.store = store;

    firebase.initializeApp(this._config);
    firebase.auth().signInAnonymously();

    let todosRef = firebase.database().ref('todos');
    todosRef.on('value', this._setTodos.bind(this));
  }

  _setTodos(data) {
    const todos = data.val();

    this.store.dispatch({
      type: 'SET_STATE',
      state: {
        todos: todos,
        filter: 'all'
      }
    });
  }
}
