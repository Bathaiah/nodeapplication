const express = require('express');
const request = require('supertest');
const router = require('../../../app/routes/routes');
const reservationController = require('../../../app/controllers/reservationController');

// describe('Reservation Routes', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
// }),

jest.mock('express', () => ({
  Router() {
    return {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    };
  },
}));

describe('Reservation Routes', () => {
  beforeEach(() => {
         jest.clearAllMocks();
       });
  it('should register routes with the correct controller functions', () => {
    
    expect(express.Router().get).toHaveBeenCalledWith('/', reservationController.getReservations);
    expect(express.Router().get).toHaveBeenCalledWith('/:id', reservationController.getReservation);
    expect(express.Router().post).toHaveBeenCalledWith('/', reservationController.createReservation);
    expect(express.Router().put).toHaveBeenCalledWith('/:id', reservationController.updateReservation);
    expect(express.Router().get).toHaveBeenCalledWith('/memberId/:id', reservationController.getMemberDetails);
  });

  it('should respond with status 200 when GET / is called', async () => {
    reservationController.getReservations.mockImplementationOnce((req, res) => {
      res.status(200).send('All reservations');
    });

    const response = await request(router).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('All reservations');
  });

});

describe('Reservation Routes', () => {
  it('should register routes with the correct controller functions', () => {
    expect(express.Router().get).toHaveBeenCalledWith('/', reservationController.getReservations);
    expect(express.Router().get).toHaveBeenCalledWith('/:id', reservationController.getReservation);
    expect(express.Router().post).toHaveBeenCalledWith('/', reservationController.createReservation);
    expect(express.Router().put).toHaveBeenCalledWith('/:id', reservationController.updateReservation);
    expect(express.Router().get).toHaveBeenCalledWith('/memberId/:id', reservationController.getMemberDetails);
  });

  it('should respond with status 200 and reservation data when GET /:id is called', async () => {
    const mockReservation = { 
        "reservationId": 676434,
       "guestMemberId": 8678756,
       "guestName": "KOPPALA",
       "hotelName": "SARAVANA",
       "arrivalDate": "2024-06-14T18:30:00.000Z",
       "departureDate": "2024-06-16T18:30:00.000Z",
       "status": "cancelled",
       "baseStayAmount": 3000,
       "taxAmount": 270
     };
    reservationController.getReservation((req, res) => {
      res.status(200).json(mockReservation);
    });

    const response = await request(router).get('/676434');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockReservation);
  });

  it('should respond with status 200 and created reservation data when POST / is called', async () => {
    const mockRequestBody = { 
        "reservationId": 676434,
        "guestMemberId": 8678756,
        "guestName": "VENKATESH",
        "hotelName": "MINERVA",
        "arrivalDate": "2024-06-14T18:30:00.000Z",
        "departureDate": "2024-06-16T18:30:00.000Z",
        "status": "active",
        "baseStayAmount": 3000,
        "taxAmount": 270
     };
    const mockCreatedReservation = { 
        "reservationId": 676434,
        "guestMemberId": 8678756,
        "guestName": "VENKATESH",
        "hotelName": "MINERVA",
        "arrivalDate": "2024-06-14T18:30:00.000Z",
        "departureDate": "2024-06-16T18:30:00.000Z",
        "status": "active",
        "baseStayAmount": 3000,
        "taxAmount": 270
     };
    reservationController.createReservation((req, res) => {
      res.status(200).json(mockCreatedReservation);
    });

    const response = await request(router).post('/').send(mockRequestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCreatedReservation);
  });

  it('should respond with status 200 and updated reservation data when PUT /:id is called', async () => {
    const mockReservationId = '676434';
    const mockRequestBody = { 
        "reservationId": 676434,
        "guestMemberId": 8678756,
        "guestName": "VENKATESH",
        "hotelName": "MINERVA",
        "arrivalDate": "2024-06-14T18:30:00.000Z",
        "departureDate": "2024-06-16T18:30:00.000Z",
        "status": "active",
        "baseStayAmount": 3000,
        "taxAmount": 270
     };
    const mockUpdatedReservation = {
        "_id": "6664578e0ee252c1a82d6e09",
        "reservationId": 676434,
        "guestMemberId": 8678756,
        "guestName": "KOPPALA",
        "hotelName": "SARAVANA",
        "arrivalDate": "Sat Jun 15 2024 00:00:00 GMT+0530 (India Standard Time)",
        "departureDate": "Mon Jun 17 2024 00:00:00 GMT+0530 (India Standard Time)",
        "status": "cancelled",
        "baseStayAmount": 3000,
        "taxAmount": 270,
        "createdAt": "2024-06-08T13:07:26.364Z",
        "updatedAt": "2024-06-08T16:10:38.514Z",
        "__v": 0
    };
    reservationController.updateReservation((req, res) => {
      res.status(200).json(mockUpdatedReservation);
    });

    const response = await request(router).put(`/${mockReservationId}`).send(mockRequestBody);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockUpdatedReservation);
  });

  it('should respond with status 200 and member details when GET /memberId/:id is called', async () => {
    const mockMemberId = '8678756';
    const mockMemberDetails = {
        "guestMemberId": "8678756",
        "upcomingStayInfo": {
            "numberOfUpcomingStays": 5,
            "numberOfNightsInUpcomingStays": 10,
            "upcomingStaysAmount": 16604
        },
        "pastStayInfo": {
            "numberOfPastStays": 0,
            "numberOfNightsInPastStays": 0,
            "pastStayAmount": 0
        },
        "cancelledStayInfo": {
            "numberOfCancelledReservations": 2
        },
        "totalStayAmount": 16604
    };
    reservationController.getMemberDetails((req, res) => {
      res.status(200).json(mockMemberDetails);
    });

    const response = await request(router).get(`/memberId/${mockMemberId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockMemberDetails);
  });
});
