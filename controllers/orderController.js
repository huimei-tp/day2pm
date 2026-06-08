const db = require("../config/db");

exports.getOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        o.id,
        o.order_date,
        o.qty,
        f.name,
        f.price
      FROM orders o
      INNER JOIN food f
      ON o.food_id = f.id
      ORDER BY o.id DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      order_date,
      food_id,
      qty
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO orders
       (order_date, food_id, qty)
       VALUES (?, ?, ?)`,
      [order_date, food_id, qty]
    );

    res.json({
      message: "Order created",
      id: result.insertId
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};