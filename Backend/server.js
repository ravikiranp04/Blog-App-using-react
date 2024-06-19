const exp = require("express");
const app = exp();
const cors = require('cors');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;

// Define the allowed origins
//const allowedOrigins = ['https://blog-app-using-react-4.onrender.com'];

const corsOptions = {
  origin: 'https://blog-app-using-react-4.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Use the CORS middleware with the options defined
app.use(cors(corsOptions));

// Static file serving from React build directory
app.use(exp.static(path.join(__dirname, '../frontend/build')));

// Body parser middleware
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

// APIs
const userApp = require('./APIs/user-api');
const authorApp = require('./APIs/author-api');
const adminApp = require('./APIs/admin-api');

// Route middleware
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);

// Error handler middleware
app.use((err, req, res, next) => {
    res.status(500).json({ status: "error", message: err.message });
});

// MongoDB connection
mongoClient.connect(process.env.DB_URL)
.then(client => {
    const blogDBObj = client.db('blogdb');
    const usersCollection = blogDBObj.collection('users');
    const authorsCollection = blogDBObj.collection('authors');
    const articlesCollection = blogDBObj.collection('articlesCollection');
    app.set('usersCollection', usersCollection);
    app.set('authorsCollection', authorsCollection);
    app.set('articlesCollection', articlesCollection);
    console.log('DB connection success');
})
.catch(err => {
    console.log("Err in DB connect", err);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Closing MongoDB connection');
    mongoClient.close();
    process.exit(0);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
