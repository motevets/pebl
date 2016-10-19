let _todos = [];
const _subscribers = [];

function _setAll(todos) {
  _todos = todos;
  _subscribers.forEach( (subscriber) => subscriber(todos) );
}

function _subscribeToUpdates(subscriber) {
  subscriber(_todos);
  _subscribers.push(subscriber);
}

export default class FakeTodosRepo {
  list(){
    return _todos;
  }

  setAll(todos){
    _setAll(todos);
  }

  subscribeToUpdates(subscriber) {
    _subscribeToUpdates(subscriber);
  }

  reset(){
    _todos = [];
  }
}
