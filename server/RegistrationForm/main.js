const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Use the cors middleware
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI
const uri = 'mongodb+srv://gangardedipa:jlAe2y014ILvOsoR@testmongodb.ac6cjzm.mongodb.net/eventManagement?retryWrites=true&w=majority&appName=TestMongoDB'; // Include the database name in the URI
const collectionName = 'users'; // Specify the collection name for your users

// Function to connect to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        return client.db().collection(collectionName); // Use client.db() without arguments to access the default database
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Example route to save user data
app.post('/api/users', async (req, res) => {
    try {
        const userData = req.body;
        const collection = await connectToMongoDB();
        const result = await collection.insertOne(userData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Error saving user data' });
    }
});

// Example route to retrieve all users
app.get('/api/users', async (req, res) => {
    try {
        const collection = await connectToMongoDB();
        const users = await collection.find().toArray();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Error retrieving users' });
    }
});

app.get('/api/hello', (req, res) => {
    res.send('Hello World! Dipali');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});