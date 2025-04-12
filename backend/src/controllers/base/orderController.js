class OrderController {
    async handleRequest(req, res, next) {
      throw new Error("handleRequest method must be implemented");
    }
  }
  
  module.exports = OrderController;
  