const supabase = require("../config/supabase");

const addTransaction = (params, body) =>
  new Promise((resolve, reject) => {
    const { customer_id } = params;
    const { payment_id, address_id, total } = body;
    supabase
      .from("transaction")
      .insert([
        {
          customer_id,
          payment_id,
          address_id,
          total,
        },
      ])
      .select()
      .then((result) => {
        if (!result.error) {
          resolve(result);
        } else {
          reject(result);
        }
      });
  });

const addOrder = (transaction_id, product_id, quantity) =>
  new Promise((resolve, reject) => {
    supabase
      .from("order")
      .insert([{ transaction_id, product_id, quantity }])
      .then((result) => {
        if (!result.error) {
          resolve(result);
        } else {
          reject(result);
        }
      });
  });

module.exports = {
  addTransaction,
  addOrder,
};
