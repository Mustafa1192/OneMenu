const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // To Send OTP
const crypto = require('crypto'); // To generate OTP
const bcrypt = require('bcrypt'); // To hash passwordsconst razorpay = require('razorpay');
const razorpay = require('razorpay');

const authRouter = require('./routes/authRoutes.js');// Adjust the path as necessary
const userRouter = require('./routes/userRoutes.js');
const Fooditems = require('./models/Fooditems.js');  
const FrankiesRolls = require('./models/FrankiesRolls.js');
const FreshJuice = require('./models/FreshJuice.js');
const AnnaDishes = require('./models/AnnaDishes.js');
const itemsRoutes = require('./routes/itemRoutes.js'); 

const instance = new razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

instance.orders.create({ amount: 50000, currency: 'INR', receipt: 'order_rcptid_11' }, function (err, order) {
  console.log(order);
});

const app = express();
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

    
// MongoDB Connection URI
const MONGODB_URI = 'mongodb+srv://ansarifurqan:WnuOCOLphYHrOFP0@cluster0.9j2gt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const allowedOrigin = ['http://localhost:5173','http://localhost:5174']
const allowedOrigin = ['https://chipper-llama-e67cf9.netlify.app','https://chipper-choux-b6f473.netlify.app']
// Middleware
app.use(cors({origin: allowedOrigin, credentials:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully 🚀'))
    .catch(error => console.error('MongoDB connection error:', error));

// User Schema and Model
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String }
// }, { collection: 'User', timestamps: true });

// const User = mongoose.model('User', userSchema);

// // TempUser Schema and Model
// const tempUserSchema = new mongoose.Schema({
//     username: { type: String },
//     email: { type: String, required: true, unique: true },
//     otp: { type: String },
//     otpExpires: { type: Date }
// }, { collection: 'TempUser', timestamps: true });

// const TempUser = mongoose.model('TempUser', tempUserSchema);
     
// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onemenu.it@gmail.com',
        pass: 'euwo vymq gdxb jsmf' // Consider environment variables or secure vault for credentials
    }
});

// Route: Register New User After OTP Verification
// app.post('/register', async (req, res) => {
//   const { email, username, password, otp } = req.body;

//   try {
//       const tempUser = await TempUser.findOne({ email });

//       if (!tempUser || tempUser.otp !== otp) {
//           return res.status(400).json({ message: 'Invalid or expired OTP.' });
//       }

//       // Check if the username or email is already taken
//       const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//       if (existingUser) {
//           return res.status(400).json({ message: 'Email or username already in use.' });
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create the new user
//       const newUser = new User({ email, username, password: hashedPassword });
//       await newUser.save();

//       // Cleanup TempUser record
//       await TempUser.deleteOne({ email });

//       res.status(201).json({ message: 'User registered successfully.' });
//   } catch (error) {
//       console.error('Error during registration:', error);
//       res.status(500).json({ message: 'Server error.' });
//   }
// });

// Helper: Generate OTP
// const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Helper: Send Email
const sendEmail = (to, subject, text) => {
    return transporter.sendMail({
        from: 'onemenu.it@gmail.com',
        to,
        subject,
        text,
    });
};

// Route: Send OTP for Login/Registration
// app.post('/send-otp', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const userInDB = await User.findOne({ email });
//         const otp = generateOTP();

//         if (userInDB) {
//             // Existing user: Send OTP for login
//             await TempUser.findOneAndUpdate(
//                 { email },
//                 { otp, otpExpires: Date.now() + 60000 },
//                 { upsert: true, new: true }
//             );

//             await sendEmail(email, 'Login OTP', `Your OTP is: ${otp}`);
//             return res.status(200).json({ 
//                 message: 'OTP sent for login.', 
//                 isNewUser: false // No registration fields for existing user
//             });
//         } else {
//             // New user: Send OTP and provide registration fields
//             await TempUser.findOneAndUpdate(
//                 { email },
//                 { otp, otpExpires: Date.now() + 60000 },
//                 { upsert: true, new: true }
//             );

//             await sendEmail(email, 'Registration OTP', `Your OTP is: ${otp}`);
//             return res.status(200).json({ 
//                 message: 'OTP sent for registration.', 
//                 isNewUser: true, // Show registration fields for new user
//                 registrationFields: { // You can customize the registration fields here
//                     username: "",
//                     password: "",
//                     confirmPassword: ""
//                 }
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error occurred.' });
//     }
// });

// // Route: Verify OTP for Login/Rwgistration.
// app.post('/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//       // Find the temporary user record with the OTP
//       const tempUser = await TempUser.findOne({ email });

//       // Check if the user exists in TempUser and verify the OTP
//       if (!tempUser) {
//           return res.status(404).json({ message: 'No pending OTP request found.' });
//       }

//       // Check if OTP matches
//       if (tempUser.otp !== otp) {
//           return res.status(400).json({ message: 'Invalid OTP.' });
//       }

//       // Check if OTP is expired
//       if (Date.now() > tempUser.otpExpires) {
//           return res.status(400).json({ message: 'OTP has expired.' });
//       }

//       // OTP is valid, now find the user in the main User collection
//       const user = await User.findOne({ email });

//       if (!user) {
//           return res.status(404).json({ message: 'User not found.' });
//       }

//       // If the user exists, you can proceed to logging them in.
//       // For now, we'll send a success response as a simple way of completing the login
//       res.status(200).json({ message: 'Login successful.' });

//       // (Optional) Generate JWT token here if you use tokens for authentication.

//       // Cleanup: Delete the temporary OTP entry after it's been used.
//       await TempUser.deleteOne({ email });

//   } catch (error) {
//       console.error('Error during OTP verification:', error);
//       res.status(500).json({ message: 'Server error during OTP verification.' });
//   }
// });

// // Route: Resend OTP
// app.post('/resend-otp', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const otp = generateOTP();
//         await TempUser.findOneAndUpdate(
//             { email },
//             { otp, otpExpires: Date.now() + 60000 },
//             { upsert: true, new: true }
//         );

//         await sendEmail(email, 'Your New OTP', `Your new OTP is: ${otp}`);
//         res.status(200).json({ message: 'OTP resent successfully.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error.' });
//     }
// });

// // Route: Fetch Products from Multiple Collections
app.get('/api/products/:menuType', async (req, res) => {
    const { menuType } = req.params;
  
    try {
        // Dynamically select the collection model based on the menuType
        let collection;
        if (menuType === 'fooditems') {
          collection = Fooditems;
        } else if (menuType === 'frankies_Rolls') {
          collection = FrankiesRolls;
        } else if (menuType === 'FreshJuice') {
          collection = FreshJuice;
        } else if (menuType === 'AnnaDishes') {
          collection = AnnaDishes;
        } else {
          return res.status(400).json({ message: 'Invalid menu type.' });
        }

      const products = await collection.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  });

// Route: Get all menus
app.get('/products/menu', async (req, res) => {
  try {
    const foodItems = await Fooditems.find();
    const frankiesRolls = await FrankiesRolls.find();
    const annaDishes = await AnnaDishes.find();
    const freshJuice = await FreshJuice.find();

    const menus = {
      foodItems,
      frankiesRolls,
      annaDishes,
      freshJuice,
    };

    res.status(200).json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ message: 'Server error while fetching menus' });
  }
});


// Dashboard
app.get('/', (req, res)=> res.send("App Working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

//Live Order
const orderSchema = new mongoose.Schema({
  orderId: String,
  paymentStatus: String,
  items: Array,
  totalAmount: Number,
  gst: Number,
  date: Date,
  customer: {
    name: String,
    email: String,
    contact: String
  }
});

const Order = mongoose.model('Order', orderSchema);

// POST endpoint for adding an order
app.post('/api/order', async (req, res) => {
  try {
    const newOrder = new Order({
      orderId: req.body.orderId,
      items: req.body.items,
      customer: req.body.customer,
      paymentStatus: req.body.paymentStatus,
      totalAmount: req.body.totalAmount,
      orderStatus: 'Pending',  // Default status
      date: new Date(),
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Failed to add order' });
  }
});


// GET route to fetch all orders
app.get('/api/order', (req, res) => {
  Order.find()
    .sort({ date: -1 }) // Sort by date in descending order
    .then(orders => {
      res.json(orders); // Return the orders as JSON
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch orders', error });
    });
});

// Route setup with /api prefix for Edit Item
app.put('/api/products/update/:stall/:id', async (req, res) => {
  const { stall, id } = req.params; // `stall` will tell which model to use
  const { title, price, name, rating } = req.body;

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    let Model;
    
    // Dynamically choose the model based on the `stall` parameter
    switch (stall) {
      case 'foodItems':
        Model = Fooditems;
        break;
      case 'frankiesRolls':
        Model = FrankiesRolls;
        break;
      case 'annaDishes':
        Model = AnnaDishes;
        break;
      case 'freshJuice':
        Model = FreshJuice;
        break;
      default:
        return res.status(400).json({ message: 'Invalid stall type' });
    }

    // Find and update the product by ObjectId
    const updatedProduct = await Model.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product", error });
  }
});

// Delete product by ID
app.delete("/api/products/delete/:stall/:id", async (req, res) => {
  try {
    const { stall, id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Dynamically choose the model based on the `stall` parameter
    let Model;

    switch (stall) {
      case 'foodItems':
        Model = Fooditems;
        break;
      case 'frankiesRolls':
        Model = FrankiesRolls;
        break;
      case 'annaDishes':
        Model = AnnaDishes;
        break;
      case 'freshJuice':
        Model = FreshJuice;
        break;
      default:
        return res.status(400).json({ error: "Invalid stall type" });
    }

    // Find and delete the product by ID in the selected model
    const product = await Model.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Log success
    console.log("Deleted product:", product);

    // Send response
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// PUT route to update the payment status of an order
app.put('/api/order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  Order.findByIdAndUpdate(orderId, { paymentStatus: status }, { new: true })
    .then(updatedOrder => {
      res.status(200).json(updatedOrder); // Return the updated order
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to update order status', error });
    });
});

// Add Item
app.use('/api', itemsRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
