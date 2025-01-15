// import database
const db = require("../config/database");

// membuat class Alumni
class Alumni {
  // Fungsi untuk mendapatkan semua data alumni
  static async all() {
    try {
      const sql = "SELECT * from alumni";
      const results = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Gagal mengambil data alumni: " + err.message);
    }
  }

  // Fungsi untuk menambahkan data alumni baru
  // Fungsi untuk menambahkan alumni
  static async create(data) {
    const { nama, hp, alamat, tahunLulus, status, perusahaan, jabatan } = data;

    // Validasi input untuk nama
    if (!nama || !nama.trim()) {
      throw new Error("Nama alumni harus diisi!");
    }

    const query = `INSERT INTO alumni (nama, hp, alamat, tahunLulus, status, perusahaan, jabatan) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [nama, hp, alamat, tahunLulus, status, perusahaan, jabatan], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      const selectQuery = `SELECT * FROM alumni WHERE id = ?`;
      const rows = await new Promise((resolve, reject) => {
        db.query(selectQuery, [result.insertId], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      return rows[0]; // Mengembalikan alumni yang baru dimasukkan
    } catch (err) {
      throw new Error("Gagal menambahkan alumni: " + err.message);
    }
  }


  // Fungsi untuk mengupdate data alumni
  static async update(id, data) {
    const { nama, hp, alamat, tahunLulus, status, perusahaan, jabatan } = data;

    const query = `UPDATE alumni SET nama = ?, hp = ?, alamat = ?, tahunLulus = ?, status = ?, perusahaan = ?, jabatan = ? WHERE id = ?`;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [nama, hp, alamat, tahunLulus, status, perusahaan, jabatan, id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (result.affectedRows === 0) {
        return null; // Jika tidak ada data yang diupdate
      }

      const selectQuery = `SELECT * FROM alumni WHERE id = ?`;
      const rows = await new Promise((resolve, reject) => {
        db.query(selectQuery, [id], (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });

      return rows[0]; // Mengembalikan data alumni yang sudah diupdate
    } catch (err) {
      throw new Error("Gagal mengupdate alumni: " + err.message);
    }
  }

  static async findById(id) {
    const query = `SELECT * FROM alumni WHERE id = ?`;
  
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  
      if (result.length === 0) {
        throw new Error("Alumni tidak ditemukan");
      }
  
      return result[0]; // Mengembalikan alumni yang ditemukan
    } catch (err) {
      throw new Error("Gagal mengambil data alumni: " + err.message);
    }
  }
  

  // Fungsi untuk mencari alumni berdasarkan kriteria
  static async search(queryParams) {
    const { nama, tahunLulus, status } = queryParams;
    let query = "SELECT * FROM alumni WHERE 1=1";
    const params = [];

    if (nama) {
      query += " AND nama LIKE ?";
      params.push(`%${nama}%`);
    }

    if (tahunLulus) {
      query += " AND tahunLulus = ?";
      params.push(tahunLulus);
    }

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });

      return results;
    } catch (err) {
      throw new Error("Gagal mencari alumni: " + err.message);
    }
  }
}

// export class Alumni
module.exports = Alumni;
