const { generateJwt, verifyJwt } = require('../../helpers/jwt');
const { UserModel } = require("./model");
require("dotenv").config()

/**
 * Controller class for handling user-related operations.
 */
class UserController {
  /**
   * Authenticates the user and generates a JWT token.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves once the authentication is completed.
   */
  static async auth(req, res) {
    try {
      await UserModel.create(req.user);
      const { email } = req.user;

      await new Promise((resolve, reject) => {
        Events.UserEvents.emit('getUserByEmail', email, (message) => {
          const id = message._id
          const TOKEN = generateJwt({ email, id });
          req.session.token = TOKEN
          res.redirect(`${process.env.FRONTEND}/auth/setup?token=Bearer ${TOKEN}`);
          resolve();
        });
      });

    } catch (err) {
      Response.error(res, err.message);
    }
  }

  /**
   * Fetch the user details
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async user(req, res) {
    try {
      let email = req.user.email
      let user = await UserModel.getUser(email);
      Response.success(res, "Success", { user }, 200);
    } catch (err) {
      Response.error(res, err.message);
    }
  }

  /**
   * Validate Token Request
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async validateToken(req, res) {
    Response.success(res, "Success", 200);
  }
}

module.exports = {
  UserController
};
