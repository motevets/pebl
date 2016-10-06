export default class FakeTodosRepo {
  constructor() {
    this._todos = [];
  }

  list(){
    return this._todos;
  }

  setAll(todos){
    this._todos = todos;
  }

  subscribeToUpdates(publish) {
    publish(this._todos);
  }
}
