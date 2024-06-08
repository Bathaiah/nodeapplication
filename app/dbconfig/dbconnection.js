//mongodb+srv://bathaiahkoppala18:52twWxhQ9xhrsjP9@mycluster.1ub1xo1.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster

const mongoose = require('mongoose')

const connectionString = `mongodb+srv://bathaiahkoppala18:52twWxhQ9xhrsjP9@mycluster.1ub1xo1.mongodb.net/NodeApi?retryWrites=true&w=majority&appName=MyCluster`;

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');

    } catch (error) {
        console.error(error);
    }
}

module.exports = connectToDB;