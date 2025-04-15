import { app, httpServer } from './index';

describe('App', () => {
  afterAll((done) => {
    httpServer.close(() => {
      done();
    });
  });

  it('should start the server', () => {
    expect(app).toBeDefined();
  });
}); 