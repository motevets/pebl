import {expect} from 'chai';
import sinon from 'sinon';

function itBehavesLikeATodosRepo() {
  beforeEach(function() {
    this.repo.reset();
    this.otherListRepo.reset();
  });

  describe('#setAll', function() {
    it('sets all of todos', function() {
      const todos = [ {text: 'text', status: 'active'} ];
      this.repo.setAll(todos);
      return expect(this.repo.list()).to.eventually.eql(todos);
    });
  });

  describe('#list', function() {
    it('returns an empty array', function() {
      return expect(this.repo.list()).to.eventually.eql([]);
    });
  });

  describe('#subscribeToUpdates', function() {
    it('calls the publish function with todos', function() {
      const todos = [ {text: 'text', status: 'active'} ];
      this.repo.setAll(todos);
      const publishSpy = sinon.spy();
      this.repo.subscribeToUpdates(publishSpy);
      expect(publishSpy).to.have.been.calledWith(todos);
    });

    it('calls the publish function when more todos are added', function(done) {
      var callCount = 0;
      function subscriber(emittedTodos) {
        if(callCount++ == 0) {
          expect(emittedTodos).to.eql([]);
        } else {
          expect(emittedTodos).to.eql(todos);
          done();
        }
      }

      const todos = [ {text: 'text', status: 'active'} ];
      this.repo.subscribeToUpdates(subscriber);
      this.otherRepo.setAll(todos);
    });
  });

  describe('configuration', function() {
    it('uses the list specified', function() {
      const todos = [ {text: 'text', status: 'active'} ];
      this.repo.setAll(todos);
      return expect(this.otherListRepo.list()).to.eventually.eql([]);
    });
  });
}

import FakeTodosRepo from '../../../src/repos/FakeTodosRepo';

const config = {list: '_test'};

describe('FakeTodosRepo', function() {
  beforeEach(function() {
    this.repo = new FakeTodosRepo(config);
    this.otherRepo = new FakeTodosRepo(config);
    this.otherListRepo = new FakeTodosRepo({list: '_otherTest'});
  });

  itBehavesLikeATodosRepo();
});


import TodosRepo from '../../../src/repos/TodosRepo';

describe('TodosRepo', function() {
  beforeEach(function() {
    this.repo = new TodosRepo(config);
    this.otherRepo = new TodosRepo(config);
    this.otherListRepo = new TodosRepo({list: '_otherTest'});
  });

  itBehavesLikeATodosRepo();
});
