const accommodationDefinition = (sequelize, DataTypes) => {
  const Accommodations = sequelize.define('Accommodations', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    geoLocation: {
      type: DataTypes.STRING
    },
    space: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.STRING
    },
    highlights: {
      type: DataTypes.STRING
    },
    amenities: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {});
  Accommodations.associate = (models) => {
    Accommodations.belongsTo(models.Place, {
      foreignKey: 'locationId',
      as: 'Places',
      onDelete: 'CASCADE'
    });
  };
  return Accommodations;
};
export default accommodationDefinition;