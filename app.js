
const express = require('express');
const mongoose = require('mongoose');

require('./models/Product');
require('./models/Variant');
const productRoutes = require('./routes/products');

mongoose.Promise = global.Promise;
//user name and passwor has to be removed
mongoose.connect('mongodb://<username>:<password>@ds145273.mlab.com:45273/ecommerce-db', {useNewUrlParser: true});

const app = express();

app.use('/', productRoutes);


const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
});


