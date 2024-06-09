const mongoose = require('mongoose');
const ReservationSchema = require('../../../app/models/reservationModel');

describe('Reservation Schema', () => {
  it('should have the correct fields', () => {
    const { reservationId, guestMemberId, guestName, hotelName, arrivalDate, departureDate, status, baseStayAmount, taxAmount } = ReservationSchema;
    expect(reservationId).toEqual({ type: Number, required: true });
    expect(guestMemberId).toEqual({ type: Number, required: true });
    expect(guestName).toEqual({ type: String, required: false });
    expect(hotelName).toEqual({ type: String, required: false });
    expect(arrivalDate).toEqual({ type: String, required: false });
    expect(departureDate).toEqual({ type: String, required: false });
    expect(status).toEqual({ type: String, required: false });
    expect(baseStayAmount).toEqual({ type: Number, required: false, default: 0 });
    expect(taxAmount).toEqual({ type: Number, required: false, default: 0 });
  });

});

describe('Reservation Model', () => {
  it('should create a reservation model', () => {
    const MockModel = jest.fn(() => ({ save: jest.fn() }));
    mongoose.model = MockModel;
    const mockSchema = {};
    mongoose.Schema = jest.fn(() => mockSchema);
    const mockReservationSchema = {};
    mongoose.Schema.mockReturnValueOnce(mockReservationSchema);

    const result = Reservation;

    expect(result).toBe(mockModel);
    expect(mongoose.Schema).toHaveBeenCalledWith(
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
          required: false
        },
        departureDate: {
          type: String,
          required: false
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
    );
    expect(mongoose.model).toHaveBeenCalledWith('Reservation', mockReservationSchema);
  });
});
