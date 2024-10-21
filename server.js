// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Initialize the Express app and set the port
const app = express();
const port = 30001;


const path = require('path');
const { userInfo } = require('os');
// Database setup
const db = new sqlite3.Database('users.db');

// Create the users table if it does not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      number TEXT NOT NULL,
      course TEXT NOT NULL,
      email TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Database setup complete!");
    }
  });
});

// Create users table if it doesn't exist
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        id_number TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);
  });

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS, JS, images etc.)
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // This line sets the views directory correctly


// Routes
// Route to render the home page
app.get('/', (req, res) => {
  res.render('index');
});
  
// Route to render the form page
app.get('/form', (req, res) => {
  res.render('form');
});
app.get('/login', (req, res) => {
    res.render('login');
  });

// Route to render the autogenerate page
app.get('/auto', (req, res) => {
    res.render('auto');
  });

// Route to render the all courses page
app.get('/allcourses', (req, res) => {
  res.render('allcourses');
});
app.get('/registeredstudent', (req, res) => {
    res.render('registeredstudent');
  });

// Route to render the dashboard page with user data
app.get('/dashboard', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error retrieving data.");
        }
        res.render('dashboard', { users: rows }); // Render the dashboard view with user data
    });
});

// Route to handle form submission and store data in the database
app.post('/submit', (req, res) => {
    const { fullname, email, number, course } = req.body;
    const query = `INSERT INTO users (fullname, email, number, course) VALUES (?, ?, ?, ?)`;
    db.run(query, [fullname, email || null, number, course], function(err) {
      if (err) {
        console.error("Database error:", err); // Log database errors
        return res.status(500).send("Error saving data.");
      }
      res.send("User information saved successfully!");
    });
  });


// Route to handle form submission
app.post('/submit', (req, res) => {
  const { username, id_number, password } = req.body;

  // Ensure all required fields are present
  if (!username || !id_number || !password) {
    return res.status(400).send("Missing required fields.");
  }

  const query = `INSERT INTO users (username, id_number, password) VALUES (?, ?, ?)`;
  db.run(query, [username, id_number, password], function(err) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error saving data.");
    }
    res.send("User information saved successfully!");
  });
});
  
// function to delete userInfo for table
app.delete('/delete-user/:id', (req, res) => {
    const userId = req.params.id;

    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [userId], function(err) {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ success: false, message: "Error deleting user" });
        }
        res.json({ success: true });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
