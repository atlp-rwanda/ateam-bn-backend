const up = (queryInterface) => queryInterface.bulkInsert('Users', [{
  name: 'Jimmy Kaykay',
  username: 'kay',
  email: 'Jkay@gmail.com',
  role: 'Manager',
  gender: 'MALE',
  createdAt: new Date(),
  updatedAt: new Date()
}]);

const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});

module.exports = {
  up,
  down
};
