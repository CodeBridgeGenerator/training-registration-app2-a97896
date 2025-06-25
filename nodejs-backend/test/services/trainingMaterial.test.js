const assert = require('assert');
const app = require('../../src/app');

describe('\'trainingMaterial\' service', () => {
  it('registered the service', () => {
    const service = app.service('trainingMaterial');

    assert.ok(service, 'Registered the service (trainingMaterial)');
  });
});
