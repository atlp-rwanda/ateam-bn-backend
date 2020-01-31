const userDefinition = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    birthdate: {
      type: DataTypes.DATE
    },
    preferredLanguage: {
      type: DataTypes.STRING
    },
    preferredCurrency: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    lineManager: {
      type: DataTypes.STRING
    },
<<<<<<< HEAD
    isVerified: {
=======
    lineManager: {
>>>>>>> ft(signup-endpoint): add is Verified attribute
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Trip, {
      foreignKey: 'userId',
      as: 'trips',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

export default userDefinition;
