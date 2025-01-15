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
router.get("/lulusan", AlumniController.index);
router.post("/lulusan", AlumniController.store);
router.put("/lulusan/:id", AlumniController.update);
router.delete("/lulusan/:id", AlumniController.delete);
router.get("/lulusan/:id", AlumniController.show);
router.get("/lulusan/search", AlumniController.search);

// export router
module.exports = router;
