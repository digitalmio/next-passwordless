import { NextPasswordlessServer } from '../src';

describe('root', () => {
  it('should snapshot main function', () => {
    expect(
      NextPasswordlessServer({
        secret: 'abc123',
        rootUrl: 'http://localhost:3000/',
        generateEmailContent: async (_code, _link) => {
          return 'abc';
        },
        sendEmail: async (_destination, _html) => {
          return;
        },
      })
    ).toMatchSnapshot();
  });
});
