const pool = require('../utils/pool');

module.exports = class Food {
  id;
  type;
  food_group;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.food_group = row.food_group;
  }

  static async insert({ type, food_group }) {
    const { rows } = await pool.query(
      `
      INSERT INTO foods (type, food_group) VALUES ($1, $2)
      RETURNING *;`,
      [type, food_group]
    );
    return new Food(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM foods`);
    return rows.map((food) => new Food(food));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM foods WHERE id=$1`,
      [id]
    );
    if (!rows[0]) return null;
    return new Food(rows[0]);
  }
  static async update(id, { type, food_group }) {
    const { rows } = await pool.query(
      `
      UPDATE foods SET type=$2, food_group=$3 WHERE id=$1
      RETURNING *;`,
      [id, type, food_group]
    );
    return new Food(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM foods WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Food(rows[0]);
  }
};
