class Tracker {
  static async track(userId, activity) {
    Events.ActivityEvents.emit('createActivity', userId, activity)
  }
}
module.exports = Tracker
