import firebase from 'firebase';

let firebaseConnected = false;

const _firebaseConfig = {
  apiKey: 'AIzaSyAOeqHO3CwN45KNkKyVZbLn5fCi1O5LIB0',
  authDomain: 'pebl-68385.firebaseapp.com',
  databaseURL: 'https://pebl-68385.firebaseio.com'
}

function _connectToFirebase() {
  if(firebaseConnected) {
    //noop
  } else {
    const app = firebase.initializeApp(_firebaseConfig);
    firebase.auth().signInAnonymously();
    firebaseConnected = true;
  }
}

function _dataSnapshotToArray(dataSnapshot) {
  return dataSnapshot.val() === null ? [] : dataSnapshot.val();
}

export default class TodosRepo {
  constructor({list}) {
    _connectToFirebase();
    this.ref = firebase.database().ref(`${list}/todos`);
  }

  reset() {
    this.ref.off();
    this.ref.set([]);
  }

  setAll(todos) {
    this.ref.set(todos);
  }

  list() {
    return this.ref
      .once('value')
      .then(function(todos) {
        return _dataSnapshotToArray(todos);
      });
  }

  subscribeToUpdates(subscriber) {
    this.ref.on('value', (dataSnapshot) => {
      subscriber(_dataSnapshotToArray(dataSnapshot));
    });
  }
}
