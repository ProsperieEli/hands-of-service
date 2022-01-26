const pool = require('../utils/pool');

module.exports = class Animal {
  id;
  type;
  species;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.species = row.species;
  }

  static async insert({ type, species }) {
    const { rows } = await pool.query(
      `
      INSERT INTO animals (type, species) VALUES ($1, $2)
      RETURNING *;`,
      [type, species]
    );
    return new Animal(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM animals`);
    return rows.map((animal) => new Animal(animal));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM animals WHERE id=$1`,
      [id]
    );
    if (!rows[0]) return null;
    return new Animal(rows[0]);
  }
  static async update(id, { type, species }) {
    const { rows } = await pool.query(
      `
      UPDATE animals SET type=$2, species=$3 WHERE id=$1
      RETURNING *;`,
      [id, type, species]
    );
    return new Animal(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM animals WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Animal(rows[0]);
  }
};
