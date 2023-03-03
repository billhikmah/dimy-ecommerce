const model = require("../models/transaction");
const responseHandler = require("../utilities/responseHandler");

const addTransaction = async (request, response) => {
  try {
    const result = await model.addTransaction(request.params, request.body);
    const transaction_id = result.data[0].id;
    const { order } = request.body;

    await Promise.all(
      order.map(async (elemen) => {
        try {
          await model.addOrder(
            transaction_id,
            elemen.product_id,
            elemen.quantity
          );
          return elemen;
        } catch (error) {
          return responseHandler(response, error.status, error.message);
        }
      })
    );

    return responseHandler(
      response,
      result.status,
      "Transaction has been created.",
      { id: transaction_id }
    );
  } catch (error) {
    return responseHandler(response, error.status, error.message);
  }
};

module.exports = {
  addTransaction,
};
