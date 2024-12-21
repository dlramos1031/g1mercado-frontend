const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');  

const app = express();
app.use(express.json());
app.use(cors());
const fs = require('fs');
const path = require('path');
// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'the_mercado',
});


db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the application if the database connection fails
  }
  console.log('Connected to the database.');
});

// Endpoint for user registration
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
  
    // Check for missing fields
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
  
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into the database with hashed password
      const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
      db.query(query, [firstname, lastname, email, hashedPassword], (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Registration failed. Please try again.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error hashing password. Please try again.' });
    }
  });
  

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
      }
  
      if (results.length > 0) {
        const user = results[0];
  
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error.' });
          }
  
          if (isMatch) {
            res.status(200).json({
              message: 'Login successful!',
              user: {
                id: user.id,
                email: user.email,
                role: user.role, // Ensure this is included in the response
              }
            });
          } else {
            res.status(401).json({ message: 'Invalid email or password.' });
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password.' });
      }
    });
  });

app.post('/add-product', (req, res) => {
  const { product_name, description, price, category, type } = req.body;

  // Validate the request data
  if (!product_name || !description || !price || !category || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // You can set a default image or remove image handling entirely
  const image = null; // Or you could set a default image, like 'default-image.jpg'

  const query = 'INSERT INTO products (product_name, description, price, category, type, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [product_name, description, price, category, type, image], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error. Please try again.' });
    }
    console.log('Product added:', { product_name, description, price, category, type });
    res.status(200).json({ message: 'Product added successfully!' });
  });
});



// Endpoint to fetch user details by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT firstname, lastname, email FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Failed to fetch user data.' });
    }

    if (results.length > 0) {
      res.status(200).json({
        firstname: results[0].firstname,
        lastname: results[0].lastname,
        email: results[0].email,
      });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  });
});


// Endpoint to fetch products by category and type
app.get('/products', (req, res) => {
  const { category, type } = req.query; // Get category and type from query parameters

  let query = 'SELECT * FROM products WHERE category = ?';
  let queryParams = [category];

  if (type) {
    query += ' AND type = ?'; // Add filter for type if it's provided
    queryParams.push(type);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error fetching products.' });
    }

    // Update products to include image URL if image exists
    const productsWithImages = results.map((product) => {
      let imageUrl = null;
      if (product.image) {
        const base64Image = Buffer.from(product.image).toString('base64');
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
      }
      return { ...product, imageUrl };
    });

    res.status(200).json(productsWithImages); // Send the products with image URLs
  });
});


// Start the server
const HOSTNAME = "192.168.56.1"
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://${HOSTNAME}:${PORT}`);
});
