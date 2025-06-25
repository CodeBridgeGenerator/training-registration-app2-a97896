const assert = require('assert');
const app = require('../../src/app');

describe('\'trainingCourse\' service', () => {
  it('registered the service', () => {
    const service = app.service('trainingCourse');

    assert.ok(service, 'Registered the service (trainingCourse)');
  });
});
