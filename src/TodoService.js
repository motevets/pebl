export default class TodoService {
  get _config() {
    return {
      apiKey: 'AIzaSyAOeqHO3CwN45KNkKyVZbLn5fCi1O5LIB0',
      authDomain: 'pebl-68385.firebaseapp.com',
      databaseURL: 'https://pebl-68385.firebaseio.com'
    }
  }

  constructor(store, todoRepo) {
    this._store = store;
    this._todoRepo = todoRepo;

    this._todoRepo.setAll([{text: 'React', status: 'active'}]);
    this._todoRepo.subscribeToUpdates(this._setTodos.bind(this));
  }

  _handleStateChange() {
    console.log('state change!');
  }

  _setTodos(todos) {
   this._store.dispatch({
      type: 'SET_STATE',
      state: {
        todos: todos,
        filter: 'all'
      }
    });
  }
}
