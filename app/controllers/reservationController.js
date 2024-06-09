const Reservation = require('../models/reservationModel')

// Retrieve all Reservations from the database.
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Retrive one Reservation
const getReservation = async (req, res) => {
  try {
    const { id } = req.params;
    //const reservation = await Reservation.findById(id);
    const reservations = await Reservation.find({});
    const registeredId = reservations.find(it => it.reservationId === Number(id));
    res.status(200).json(registeredId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create Reservation and save into Database
const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Reservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;

    //const reservation = await Reservation.findByIdAndUpdate(id, req.body);
    // if (!reservations) {
    //     return res.status(404).json({ message: "Reservation not found" });
    //   }
    const reservations = await Reservation.find({});
    const givenReservation = reservations.find(it => it.reservationId === Number(id));
    givenReservation.status = 'cancelled';
    const updatedReservation = await Reservation.findByIdAndUpdate(givenReservation._id, givenReservation);
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Getting member details 
const getMemberDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const reservations = await Reservation.find({});
       const memberReservations = reservations.filter(it => it.guestMemberId === Number(id));
        const upcomingStays = memberReservations.filter(it => new Date(it.arrivalDate) >= Date.now());
        const pastStays = memberReservations.filter(it => new Date(it.arrivalDate) < Date.now());
        const cancelledStays = memberReservations.filter(it => it.status === 'cancelled');
        const response = {
            guestMemberId: id,
            upcomingStayInfo: {
                numberOfUpcomingStays: upcomingStays.length,
                numberOfNightsInUpcomingStays: numberOfNights(upcomingStays),
                upcomingStaysAmount: getAmount(upcomingStays)
            },
            pastStayInfo: {
                numberOfPastStays: pastStays.length,
                numberOfNightsInPastStays: numberOfNights(pastStays),
                pastStayAmount: getAmount(pastStays)
            },
            cancelledStayInfo: {
                numberOfCancelledReservations: cancelledStays.length
            },
            totalStayAmount: getAmount(upcomingStays) + getAmount(pastStays)
        }
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const numberOfNights = (stays) => {
    let count =0;
    for(let s of stays){
        var date1 = new Date(s.arrivalDate);
        var date2 = new Date(s.departureDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        count = count+numberOfNights;
    }
    return count;
}

//Calculating Amount for Stays
const getAmount = (stays) => {
    let amount = 0;
    for(let s of stays){
        amount = amount+s.baseStayAmount+s.taxAmount;
    }
    return amount;
}

module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  getMemberDetails
};