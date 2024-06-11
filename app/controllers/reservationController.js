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
    const reservations = await Reservation.findOne({reservationId: id});
    //const registeredId = reservations.find(it => it.reservationId === Number(id));
    res.status(200).json(reservations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Create Reservation and save into Database
const createReservation = async (req, res) => {
  try {
    const { arrivalDate, departureDate, reservationId, guestMemberId } = req.body;

    if (!arrivalDate || !departureDate || !reservationId || !guestMemberId) {
         res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(Date.parse(arrivalDate))) {
         res.status(400).json({ message: "Arrival date is not valid" });
    }

    if (isNaN(Date.parse(departureDate))) {
        res.status(400).json({ message: "Departure date is not valid" });
    }

    if (new Date(arrivalDate) <= new Date()) {
        res.status(400).json({ message: "Arrival date must be in the future" });
    }

    if (new Date(departureDate) <= new Date(arrivalDate)) {
        res.status(400).json({ message: "Departure date must be after arrival date" });
    }
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

    const reservation = await Reservation.findOne({reservationId: id});
    if (!reservation) {
         res.status(404).json({ message: "Reservation not found" });
      }else{
        const reservations = await Reservation.updateOne({reservationId: id}, {$set: req.body});
        res.status(200).json(reservations);
      }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Getting member details 
const getMemberDetails = async (req, res) => {
    try{
        const { id } = req.params;
        const memberReservations = await Reservation.find({guestMemberId: id});
       //const memberReservations = reservations.filter(it => it.guestMemberId === Number(id));
        const upcomingStays = memberReservations.filter(it => new Date(it.arrivalDate) >= Date.now() && it.status === 'active');
        const pastStays = memberReservations.filter(it => new Date(it.arrivalDate) < Date.now() && it.status === 'active');
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
  getMemberDetails
};