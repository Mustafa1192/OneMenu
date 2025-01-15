const express = require("express");
const router = express.Router();
const Food = require("../models/Food.json"); // Import your Mongoose model

// Route to fetch all food items
router.get("/", async (req, res) => {
    try {
      const foods = await Food.find();
      console.log("Fetched Foods:", foods); // Log fetched data
      res.status(200).json(foods);
    } catch (error) {
      console.error("Error fetching foods:", error); // Log the error
      res.status(500).json({ error: "Failed to fetch food items" });
    }
  });
  

module.exports = router;
