import FakeTodosRepo from '../../src/repos/FakeTodosRepo';
import {expect} from 'chai';

describe(FakeTodosRepo, () => {
  describe('#setAll', () => {
    it('sets all of todos', () => {
      const repo = new FakeTodosRepo();
      const todos = [ {text: 'text', status: 'active'} ];
      repo.setAll(todos);
      expect(repo.list()).to.eql(todos);
    });
 });

  describe('#list', () => {
    it('returns an empty array', () => {
      const repo = new FakeTodosRepo();
      expect(repo.list()).to.eql([]);
    });
  });

  describe('#subscribeToUpdates', () => {
    it('calls the publish function with todos', () => {
      const repo = new FakeTodosRepo();
      const todos = [ {text: 'text', status: 'active'} ];
      repo.setAll(todos);
      repo.subscribeToUpdates( (publishTodos) => {
        expect(publishTodos).to.eql(todos);
      });
    });
  });
});
