const pool = require('../utils/pool');

module.exports = class Technology {
  id;
  price;
  brand;

  constructor(row) {
    this.id = row.id;
    this.price = row.price;
    this.brand = row.brand;
  }

  static async insert({ price, brand }) {
    const { rows } = await pool.query(
      `
      INSERT INTO technologies (price, brand) VALUES ($1, $2)
      RETURNING *`,
      [price, brand]
    );
    return new Technology(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM technologies`);
    return rows.map((row) => new Technology(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM technologies WHERE id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Technology(rows[0]);
  }

  static async update(id, { price, brand }) {
    const { rows } = await pool.query(
      `
      UPDATE technologies SET price=$2, brand=$3 WHERE id=$1
      RETURNING *;`,
      [id, price, brand]
    );

    return new Technology(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM technologies WHERE id=$1
      RETURNING *`,
      [id]
    );

    return new Technology(rows[0]);
  }
};
