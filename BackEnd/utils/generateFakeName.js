// utils/generateFakeName.js
const { faker } = require('@faker-js/faker');

function generateFakeName() {
  return faker.name.findName();
}

module.exports = generateFakeName;
