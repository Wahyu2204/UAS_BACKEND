// import mysql
const mysql = require("mysql");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

/**
 * Membuat pool koneksi database menggunakan method createPool
 * Method ini lebih efisien untuk aplikasi dengan banyak koneksi
 */
const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

/**
 * Mengecek koneksi pool
 */
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database");
  connection.release();  // Lepaskan koneksi setelah selesai
});

module.exports = db;
