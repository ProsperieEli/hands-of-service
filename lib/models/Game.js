const pool = require('../utils/pool');

module.exports = class Game {
  id;
  title;
  price;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.price = row.price;
  }

  static async insert({ title, price }) {
    const { rows } = await pool.query(
      `
      INSERT INTO games (title, price) VALUES($1, $2) 
      RETURNING *;`,
      [title, price]
    );
    return new Game(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM games`);
    return rows.map((all) => new Game(all));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM games WHERE id=$1`,
      [id]
    );
    if (!rows[0]) return null;
    return new Game(rows[0]);
  }
  static async update(id, { title, price }) {
    const { rows } = await pool.query(
      `
      UPDATE games SET title=$2, price=$3 WHERE id=$1
      RETURNING *;`,
      [id, title, price]
    );
    return new Game(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM games WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Game(rows[0]);
  }
};
