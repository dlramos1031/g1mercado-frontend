const express = require('express'); // Importing Express, a framework for building web applications
const mysql = require('mysql2'); // Importing MySQL library for database connections
const cors = require('cors'); // Importing CORS to allow cross-origin requests
const bcrypt = require('bcryptjs');  // Importing bcrypt for securely hashing passwords

const app = express(); // Initializing an Express application
app.use(express.json()); // Middleware to parse JSON data in incoming requests
app.use(cors()); // Middleware to enable cross-origin requests

const fs = require('fs'); // Importing file system module for handling files
const path = require('path'); // Importing path module to work with file and directory paths

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost', // Database server
  user: 'root', // Database username
  password: '', // Database password (empty for now)
  database: 'the_mercado', // Name of the database to connect to
});

// Connecting to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message); // Log connection error
    process.exit(1); // Stop the application if the connection fails
  }
  console.log('Connected to the database.'); // Connection successful
});

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body; // Extracting data from request

  // Check if all required fields are provided
  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' }); // Return error if fields are missing
  }

  // Validate that passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' }); // Return error if passwords don't match
  }

  try {
    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [firstname, lastname, email, hashedPassword], (err) => {
      if (err) {
        console.error('Database error:', err); // Log database errors
        return res.status(500).json({ message: 'Registration failed. Please try again.' });
      }
      res.status(201).json({ message: 'User registered successfully!' }); // Success response
    });
  } catch (error) {
    console.error(error); // Log any unexpected error
    res.status(500).json({ message: 'Error hashing password. Please try again.' }); // Return generic error
  }
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
  const { email, password } = req.body; // Extracting email and password from request

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Query to find the user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log database errors
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }

    // Check if a user was found
    if (results.length > 0) {
      const user = results[0]; // Get the first result (the user)

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err); // Log unexpected errors
          return res.status(500).json({ message: 'Server error.' });
        }

        if (isMatch) {
          // Successful login
          res.status(200).json({
            message: 'Login successful!',
            user: {
              id: user.id,
              email: user.email,
              role: user.role, // Include user role in the response
            },
          });
        } else {
          res.status(401).json({ message: 'Invalid email or password.' }); // Incorrect credentials
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' }); // User not found
    }
  });
});

// Endpoint to add a new product
app.post('/add-product', (req, res) => {
  const { product_name, description, price, category, type } = req.body; // Extract product details

  // Validate that all required fields are provided
  if (!product_name || !description || !price || !category || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Set a default image (if needed)
  const image = null; // Replace with a default image filename if desired

  // Insert the new product into the database
  const query = 'INSERT INTO products (product_name, description, price, category, type, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [product_name, description, price, category, type, image], (err) => {
    if (err) {
      console.error('Database error:', err); // Log database errors
      return res.status(500).json({ message: 'Database error. Please try again.' });
    }
    console.log('Product added:', { product_name, description, price, category, type }); // Log success
    res.status(200).json({ message: 'Product added successfully!' }); // Success response
  });
});

// Endpoint to fetch user details by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params; // Extract user ID from URL parameters

  // Query to find the user by ID
  const query = 'SELECT firstname, lastname, email FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log database errors
      return res.status(500).json({ message: 'Failed to fetch user data.' });
    }

    if (results.length > 0) {
      // Return user details
      res.status(200).json({
        firstname: results[0].firstname,
        lastname: results[0].lastname,
        email: results[0].email,
      });
    } else {
      res.status(404).json({ message: 'User not found.' }); // User not found
    }
  });
});

// Endpoint to fetch products by category and type
app.get('/products', (req, res) => {
  const { category, type } = req.query; // Extract category and type from query parameters

  let query = 'SELECT * FROM products WHERE category = ?'; // Base query for category
  let queryParams = [category];

  if (type) {
    query += ' AND type = ?'; // Add type filter if provided
    queryParams.push(type);
  }

  // Fetch products from the database
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log database errors
      return res.status(500).json({ message: 'Error fetching products.' });
    }

    // Convert product images to Base64 URLs (if images exist)
    const productsWithImages = results.map((product) => {
      let imageUrl = null;
      if (product.image) {
        const base64Image = Buffer.from(product.image).toString('base64');
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
      }
      return { ...product, imageUrl }; // Return product details with image URL
    });

    res.status(200).json(productsWithImages); // Send products with image URLs
  });
});

// Start the server and listen on the specified port
const PORT = 5000; // Port number for the server
app.listen(PORT, () => {
  console.log(`Server running on http://172.22.97.121:${PORT}`); // Log the server address
});
