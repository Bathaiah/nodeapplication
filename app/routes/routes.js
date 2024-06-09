const express = require("express");
const router = express.Router();
const { getReservations, getReservation, createReservation, updateReservation, getMemberDetails} = require('../controllers/reservationController.js');

//route for getting All Reservations
router.get('/', getReservations);

//route for getting one Reservation
router.get("/:id", getReservation);

//route for creating Reservation
router.post("/", createReservation);

//route for updating reservation
router.put("/:id", updateReservation);

//route for getting Member details
router.get("/memberId/:id", getMemberDetails);

module.exports = router;