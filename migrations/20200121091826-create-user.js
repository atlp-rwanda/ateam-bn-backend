const up = (queryInterface, Sequelize) => queryInterface.createTable('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  birthdate: {
    type: Sequelize.DATE
  },
  preferredLanguage: {
    type: Sequelize.STRING
  },
  preferredCurrency: {
    type: Sequelize.STRING
  },
  locationId: {
    type: Sequelize.INTEGER
  },
  role: {
    type: Sequelize.STRING
  },
  department: {
    type: Sequelize.STRING
  },
  lineManager: {
    type: Sequelize.INTEGER
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  social_id: {
    type: Sequelize.STRING,
    unique: true
  },
  provider: {
    type: Sequelize.STRING
  }
});

const down = (queryInterface) => queryInterface.dropTable('Users');

export { up, down };
