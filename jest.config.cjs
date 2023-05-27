const { defaults } = require('jest-config');

module.exports = {
    ...defaults,
    testMatch: ['**/*.test.mjs']
};
