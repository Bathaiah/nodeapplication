const mongoose = require('mongoose');
const connectToDB = require('../../../app/dbconfig/dbconnection');

jest.mock('mongoose');

describe('connectToDB', () => {
  it('should connect to MongoDB Atlas', async () => {
    mongoose.connect.mockResolvedValueOnce();

    await connectToDB();
    //expect(mongoose.connect).toHaveBeenCalledWith(expect.stringContaining('mongodb+srv://bathaiahkoppala18:52twWxhQ9xhrsjP9@mycluster.1ub1xo1.mongodb.net/NodeApi?retryWrites=true&w=majority&appName=MyCluster'),{"autoIndex": true});
    expect(mongoose.connect).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Connected to Mongodb Atlas');
  });

  it('should handle errors when connecting to MongoDB Atlas', async () => {
    const errorMessage = 'Connection error';
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    await connectToDB();
    expect(mongoose.connect).toHaveBeenCalledWith(expect.stringContaining('mongodb+srv://bathaiahkoppala18:52twWxhQ9xhrsjP9@mycluster.1ub1xo1.mongodb.net/NodeApi?retryWrites=true&w=majority&appName=MyCluster'),{"autoIndex": true});
    
    expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
