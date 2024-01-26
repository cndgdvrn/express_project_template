class Custom_APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400 ;
    this.name = this.constructor.name;
  }
} 


module.exports = Custom_APIError;