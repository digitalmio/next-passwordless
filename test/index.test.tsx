import { NextPasswordless } from '../src';

describe('root', () => {
  it('should snapshot main function', () => {
    expect(
      NextPasswordless({ secret: 'abc123', rootUrl: 'http://localhost:3000/' })
    ).toMatchSnapshot();
  });
});
