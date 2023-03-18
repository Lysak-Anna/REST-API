const errorHandler = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};
class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.code = 401;
    this.status = "Unauthorized";
    this.message = message;
  }
}
class ConflictError extends Error {
  constructor() {
    super();
    this.code = 409;
    this.status = "Conflict";
    this.message = "Email in use";
  }
}
class SubscriptionError extends Error {
  constructor() {
    super();
    this.code = 400;
    this.status = "Bad Request";
    this.message = "Subscription must be one of: starter, pro, business";
  }
}
class NotFoundError extends Error {
  constructor() {
    super();
    this.code = 404;
    this.status = "Not Found";
    this.message = "User not found";
  }
}
module.exports = {
  errorHandler,
  UnauthorizedError,
  ConflictError,
  SubscriptionError,
  NotFoundError,
};
