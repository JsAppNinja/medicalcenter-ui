module.exports = {
  processCreditCard(req) {
    try {
      const resp = {
        error: false,
        message: 'no error',
        transactionId: 0,
      };

      resp.transactionId = '1234567890';
      resp.payload = req.body;

      return resp;
    } catch (e) {
      return {
        error: true,
        message: 'general required field error',
      };
    }
  },
};
