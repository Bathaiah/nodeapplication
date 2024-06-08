const express = require("express");
//const Reservation = require("../models/reservationModel.js");
const router = express.Router();
const { getReservations, getReservation, createReservation, updateReservation, deleteReservation, getMemberDetails} = require('../controllers/reservationController.js');

router.get('/', getReservations);

router.get("/:id", getReservation);

router.post("/", createReservation);

// update a product
router.put("/:id", updateReservation);

// delete a product
router.delete("/:id", deleteReservation);

router.get("/memberId/:id", getMemberDetails);

module.exports = router;