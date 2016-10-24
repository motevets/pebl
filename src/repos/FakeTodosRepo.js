let _store = {};

export default class FakeTodosRepo {

  constructor({list}) {
    if(_store[list] === undefined) {
      _store[list] = { todos: [], subscribers: [] };
    }
    this.store = _store[list];
  }

  list(){
    return Promise.resolve(this.store.todos);
  }

  setAll(todos){
    this.store.todos = todos;
    this.store.subscribers.forEach(subscriber => subscriber(todos));
  }

  subscribeToUpdates(subscriber) {
    subscriber(this.store.todos);
    this.store.subscribers.push(subscriber);
  }

  reset(){
    this.store.todos = [];
    this.store.subscribers = [];
  }
}
