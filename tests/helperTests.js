const {assert} = require ("chai");

const { findUserByEmail } = require("../helperFunctions");

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('findUserByEmail', function() {
  console.log('lskdmflkm')
  it('should return a user with valid email', function() {
    const user = findUserByEmail("user@example.com", testUsers);
    const expectedOutput = "userRandomID";
    // Write your assert statement here
    assert.equal(user.id, expectedOutput);
  });

  it('should return the password of a user with valid email', function() {
    const user = findUserByEmail("user2@example.com", testUsers);
    const expectedOutput = "dishwasher-funk";
    // Write your assert statement here
    assert.equal(user.password, expectedOutput);
  });

  it('should return the null for invalid email', function() {
    const user = findUserByEmail("user3@example.com", testUsers);
    const expectedOutput = null;
    // Write your assert statement here
    assert.equal(user, expectedOutput);
  });

});
//console.log(findUserByEmail("user@example.com", testUsers));