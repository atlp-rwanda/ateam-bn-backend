import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * This class contains
 * two methods, one to help hashing password (hashPassword)
 * and the second to retrieve hashed password
 */
class TokenHelper {
  /**
   * Hashs the password for signup and login response.
   * @param {integer} id The user's id.
   * @param {string} email The user's email.
   * @param {string} role The user's role.
   * @param {string} isVerified The user's isVerified.
   * @returns {string} The users's hashed password.
   */
  static generateToken(id, email, role, isVerified) {
    return jwt.sign(
      {
        id,
        email,
        role,
        isVerified
      }, process.env.SECRET_KEY
    );
  }
}
export default TokenHelper;