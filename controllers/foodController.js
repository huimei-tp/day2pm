const db = require("../config/db");

exports.getFoods = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM food ORDER BY id"
    );

    res.json(rows);
  } catch (err) {
  console.error(err);

  res.status(500).json({
    error: err.message,
    stack: err.stack
  });
}
};

exports.createFood = async (req, res) => {
  try {
    const {
      image,
      name,
      price,
      category,
      status
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO food
       (image,name,price,category,status)
       VALUES (?,?,?,?,?)`,
      [image, name, price, category, status]
    );

    res.json({
      message: "Food created",
      id: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      name,
      price,
      category
    } = req.body;

    await db.query(
      `UPDATE food
       SET image=?,
           name=?,
           price=?,
           category=?
       WHERE id=?`,
      [image, name, price, category, id]
    );

    res.json({
      message: "Food updated"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFoodStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      `UPDATE food
       SET status=?
       WHERE id=?`,
      [status, id]
    );

    res.json({
      message: "Status updated"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
