// import AlumniController
const AlumniController = require('../controllers/AlumniController');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});

// Membuat routing alumni
router.get("/alumni", AlumniController.index);
router.post("/alumni", AlumniController.store);
router.put("/alumni/:id", AlumniController.update);
router.delete("/alumni/:id", AlumniController.delete);
router.get("/alumni/:id", AlumniController.show);
router.get("/alumni/search", AlumniController.search);

// export router
module.exports = router;
