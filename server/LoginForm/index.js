// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const UserModel = require('./models/Users')

// const app = express();
// app.use(cors())
// app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.once('open', () => console.log('Connected to MongoDB'));

// db.on('error', err => console.log(err));

// app.use(bodyParser.json());

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email, password });

//         console.log(user);
//         if (user) {
//             res.status(200).json({ message: 'Login successful' });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.listen(8081, () => {
//     console.log("server is running");
// });

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
    console.log('Connected to MongoDB');

    const db = client.db('user');
    const collection = db.collection('login');

    app.use(express.json());

    // Use the cors middleware
    app.use(cors());

    // Route for user login
    app.post('/login', async (req, res) => {
        try {
        const { email, password } = req.body;
        const user = await collection.findOne({ email, password });
        
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
    }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});