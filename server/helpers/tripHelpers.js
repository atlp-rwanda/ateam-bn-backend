import models from '../models';

const {
  Trip, User
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the trip data
 */
class TripHelpers {
  /**
   * Finds if a user has trip.
   * @param {string} tripId trip id.
   * @param {string} id userId.
   * @param {string} role user role.
   * @returns {object} The trip's data.
   */
  static async tripExists(tripId, { id, role }) {
    const trip = await Trip.findOne({
      where: { id: tripId },
      include: [{
        model: User,
        as: 'Users',
        attributes: ['id', 'role', 'lineManager'],
      }]
    });

    if (!trip) return false;

    const { lineManager } = trip.Users;
    const userId = trip.Users.id;
    if ((userId === id) || (role === 'Manager' && lineManager === id)) return true;

    return 'Forbidden';
  }

  /**
     * Finds a trip by reasons and date.
     * @param {string} trip a trip data.
     * @returns {object} trip data.
     */
  static async reasonsDate(trip) {
    const {
      userId,
      reasons,
      to,
      date
    } = trip;
    const newDate = new Date(date);
    const tripExist = await Trip.findOne({
      where: {
        userId,
        reasons,
        to,
        date: newDate
      }
    });
    return tripExist;
  }

  /**
     * Saves a trip in the DB.
     * @param {object} trip The request sent by a user.
     * @returns {object} trip data.
     */
  static async saveTrip(trip) {
    const acceptedTrip = await Trip.create({
      ...trip,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fields: [
        'userId',
        'name',
        'passportId',
        'tripType',
        'from',
        'to',
        'date',
        'reasons',
        'accommodationId',
        'returnDate',
        'status',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedTrip;
  }
}

export default TripHelpers;
