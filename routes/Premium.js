const express = require("express");
const router = express.Router();
const User = require("../model/usermodel");

router.post("/purchase-premium/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is already a premium user
    if (user.subscription_status === "premium") {
      return res.status(400).json({ error: "User is already a premium user" });
    }

    // Set the user's subscription status to premium
    user.subscription_status = "premium";

    // Set the selected subscription plan (you can specify the plan name)
    user.subscription_plan = "premium_plan_name"; // Replace with the actual plan name

    // Set the subscription expiry date (you can specify the expiration date)
    user.subscription_expiry_date = new Date("2023-12-31T23:59:59Z"); // Replace with the actual expiration date

    // Save the updated user data
    await user.save();

    return res.status(200).json({ message: "Premium plan purchased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
