const {
    getReservations,
    getReservation,
    createReservation,
    updateReservation,
    getMemberDetails
  } = require('../../../app/controllers/reservationController');
  const Reservation = require('../../../app/models/reservationModel');
  
  jest.mock('../../../app/models/reservationModel');
  
  describe('Reservation Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getReservations', () => {
      it('should return all reservations from the database', async () => {
        const mockReservations = [{}, {}, {}];
        Reservation.find.mockResolvedValueOnce(mockReservations);
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        await getReservations(null, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockReservations);
      });
  
      it('should handle errors when retrieving reservations', async () => {
        const errorMessage = 'Database error';
        Reservation.find.mockRejectedValueOnce(new Error(errorMessage));
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        await getReservations(null, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  
    describe('getReservation', () => {
      it('should return a reservation by ID', async () => {
        const mockReservationId = '123';
        const mockReservation = { reservationId: 123 };
        const mockRequest = { params: { id: mockReservationId } };
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        Reservation.find.mockResolvedValueOnce([mockReservation]);
        await getReservation(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockReservation);
      });
  
      it('should handle errors when retrieving a reservation by ID', async () => {
        const mockReservationId = '123';
        const errorMessage = 'Database error';
        const mockRequest = { params: { id: mockReservationId } };
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        Reservation.find.mockRejectedValueOnce(new Error(errorMessage));
        await getReservation(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  
  });
  describe('createReservation', () => {
    it('should create a new reservation and return it', async () => {
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
      Reservation.create.mockResolvedValueOnce(mockCreatedReservation);
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await createReservation({ body: mockRequestBody }, mockResponse);
      expect(Reservation.create).toHaveBeenCalledWith(mockRequestBody);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreatedReservation);
    });
  
    it('should handle errors when creating a reservation', async () => {
      const errorMessage = 'Database error';
      Reservation.create.mockRejectedValueOnce(new Error(errorMessage));
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await createReservation(null, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
  
  describe('updateReservation', () => {
    it('should update a reservation and return it', async () => {
      const mockReservationId = '676434';
      const mockReservation = { 
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
      const mockRequest = { params: { id: mockReservationId } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      Reservation.find.mockResolvedValueOnce([mockReservation]);
      const updatedReservation = { ...mockReservation, status: 'cancelled' };
      Reservation.findByIdAndUpdate.mockResolvedValueOnce(updatedReservation);
      await updateReservation(mockRequest, mockResponse);
      expect(Reservation.find).toHaveBeenCalledWith({});
      expect(Reservation.findByIdAndUpdate).toHaveBeenCalledWith(mockReservation._id, updatedReservation);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedReservation);
    });
  
    it('should handle errors when updating a reservation', async () => {
      const mockReservationId = '123';
      const errorMessage = 'Database error';
      const mockRequest = { params: { id: mockReservationId } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      Reservation.find.mockRejectedValueOnce(new Error(errorMessage));
      await updateReservation(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
  
  describe('getMemberDetails', () => {
    it('should return member details with correct calculations', async () => {
      const mockMemberId = '123';
      const mockReservations = [{  }, {  }];
      const mockRequest = { params: { id: mockMemberId } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      Reservation.find.mockResolvedValueOnce(mockReservations);
      const expectedResponse = { "guestMemberId": "8678756",
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
      "totalStayAmount": 16604 };
      // Mock your expected calculations or response here
      await getMemberDetails(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
    });
  
    it('should handle errors when getting member details', async () => {
      const mockMemberId = '123';
      const errorMessage = 'Database error';
      const mockRequest = { params: { id: mockMemberId } };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      Reservation.find.mockRejectedValueOnce(new Error(errorMessage));
      await getMemberDetails(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
    