import {expect} from 'chai';
import sinon from 'sinon';

function itBehavesLikeATodosRepo() {
  beforeEach(function() {
    this.repo.reset();
  });

  describe('#setAll', function() {
    it('sets all of todos', function() {
      const todos = [ {text: 'text', status: 'active'} ];
      this.repo.setAll(todos);
      expect(this.repo.list()).to.eql(todos);
    });
  });

  describe('#list', function() {
    it('returns an empty array', function() {
      expect(this.repo.list()).to.eql([]);
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

    it('calls the publish function when more todos are added', function() {
      const todos = [ {text: 'text', status: 'active'} ];
      const publishSpy = sinon.spy();
      this.repo.subscribeToUpdates(publishSpy);
      expect(publishSpy).to.have.been.calledWith([]);
      this.otherRepo.setAll(todos);
      expect(publishSpy).to.have.been.calledWith(todos);
    });
  });
}

import FakeTodosRepo from '../../../src/repos/FakeTodosRepo';

const config = {};

describe(FakeTodosRepo, function() {
  beforeEach(function() {
    this.repo = new FakeTodosRepo(config);
    this.otherRepo = new FakeTodosRepo(config);
  });

  itBehavesLikeATodosRepo();
});


import TodosRepo from '../../../src/repos/TodosRepo';

describe.skip(TodosRepo, function() {
  beforeEach(function() {
    this.repo = new TodosRepo(config);
  });

  itBehavesLikeATodosRepo();
});
