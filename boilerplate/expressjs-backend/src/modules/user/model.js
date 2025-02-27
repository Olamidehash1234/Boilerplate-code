const { UserRepository } = require('./repository');

/**
 * Model representing a user.
 */
class UserModel {
  /**
   * Creates a new user.
   *
   * @param {Object} user - The user object to create.
   * @throws {Error} - If an error occurs during the creation process.
   */
  static async create(user) {
    try {
      let data = await UserRepository.create(user);

      if (data) {
        // Send signup email
        const mailBuilder = {
          recipient: data.email,
          subject: 'Welcome to Betakopa',
          name: data.name,
          emailBody: {
            message: 'Your account was created successfully',
          }
        };

        // Trigger AWS Email Sending
        const { recipient, subject, emailBody } = mailBuilder;
        // Services.Email.AWSEmail.send(recipient, subject, emailBody)

        // Trigger Create Default Permission
        Events.PermissionEvents.emit('createPermissions', data)

        // Trigger Create Default Preference
        Events.PreferenceEvents.emit('createPreference', data)

        // Trigger Create Wallet
        Events.WalletEvents.emit('createWallet', data)
      }
      return data
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUser(email) {
    try {
      return await UserRepository.getUserByEmail(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  UserModel
};
