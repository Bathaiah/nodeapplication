const mongoose = require('mongoose')

const ReservationSchema = mongoose.Schema(
    {
        reservationId: {
            type: Number,
            required: true
        },
        guestMemberId: {
            type: Number,
            required: true
        },
        guestName: {
            type: String,
            required: false
        },
        hotelName: {
            type: String,
            required: false
        },
        arrivalDate: {
            type: String,
            required: true
        },
        departureDate: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false
        },
        baseStayAmount: {
            type: Number,
            required: false,
            default: 0
        },
        taxAmount: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        timestamps: true
      }
)

const Reservation = mongoose.model("Resevation", ReservationSchema);

module.exports = Reservation;
