const express = require('express');
const connectToDB = require('./app/dbconfig/dbconnection');
const reservationRoute = require("./app/routes/routes");
const app = express()

app.use(express.json())

connectToDB();

app.get('/', (req,res) => {
    res.send('Hello from hotel Reservations')
})

app.use('/api/reservations', reservationRoute)


app.listen(3000, () => {
    console.log('Server is running on 3000')
});
