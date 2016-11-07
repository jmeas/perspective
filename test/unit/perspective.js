import perspective from '../../src/perspective';

describe('perspective', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(perspective, 'greet');
      perspective.greet();
    });

    it('should have been run once', () => {
      expect(perspective.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(perspective.greet).to.have.always.returned('hello');
    });
  });
});
