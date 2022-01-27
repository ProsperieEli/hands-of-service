const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  name;
  main_star;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.main_star = row.main_star;
  }

  static async insert({ name, main_star }) {
    const { rows } = await pool.query(
      `
      INSERT INTO movies (name, main_star) VALUES($1, $2)
      RETURNING *`,
      [name, main_star]
    );
    return new Movie(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM movies`);
    return rows.map((row) => new Movie(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM movies WHERE id=$1`,
      [id]
    );
    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }
  static async update(id, { name, main_star }) {
    const { rows } = await pool.query(
      `
      UPDATE movies SET name=$2, main_star=$3 WHERE id=$1
      RETURNING *;`,
      [id, name, main_star]
    );
    return new Movie(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM movies WHERE id=$1
      RETURNING *;`,
      [id]
    );
    return new Movie(rows[0]);
  }
};
