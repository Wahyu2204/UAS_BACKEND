// import express dan router
const express = require("express");
const router = require("./routes/api");

// import dotenv dan menjalankan method config
require("dotenv").config();

// membuat object express
const app = express();

// menggunakan middleware
app.use(express.json());

// menggunakan routing (router)
app.use(router);

// mendefinisikan port
app.listen(3000);
