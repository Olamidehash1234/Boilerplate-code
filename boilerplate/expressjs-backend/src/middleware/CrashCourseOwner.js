const { decode } = require("../helpers/jwt");
const CrashCourseRepository = require("../modules/crash-course/repository");

/**
 * Decode the user token and retrieve the email.
 *
 * @param {string} authHeader - Authorization header containing the token.
 * @returns {Promise<string>} - The decoded email.
 * @throws {Error} - If authorization parameters are not passed.
 */
const decodedUserToken = async (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Collect & decode jwt
    const token = authHeader.split(" ")[1];
    const decoded = decode(token);
    return decoded;
  } else {
    const error = new Error("Authorization parameters not passed");
    error.statusCode = 401;
    throw error;
  }
};

function CrashCourseOwner() {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const { courseId } = req.params;
      const { id } = await decodedUserToken(authHeader);
      const courseCreator = await CrashCourseRepository.getCourseById(courseId);

      if (courseCreator.userId.toString() !== id) {
        const error = new Error("You cannot perform this action");
        error.statusCode = 401;
        throw error;
      }
      next();
    } catch (error) {
      Response.error(res, error.message);
    }
  };
}

module.exports = {
  CrashCourseOwner,
};
