import { z } from "zod";
import { Payment } from "../models/payment.model.js";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";

// Dummy card validation (for demonstration)
const validateCard = (cardNumber, cvv, pin) => {
  // Simple validation: card should be 16 digits, cvv 3 digits, pin 4 digits
  const cardRegex = /^\d{16}$/;
  const cvvRegex = /^\d{3}$/;
  const pinRegex = /^\d{4}$/;

  if (!cardRegex.test(cardNumber)) {
    return { valid: false, message: "Card number must be 16 digits" };
  }
  if (!cvvRegex.test(cvv)) {
    return { valid: false, message: "CVV must be 3 digits" };
  }
  if (!pinRegex.test(pin)) {
    return { valid: false, message: "PIN must be 4 digits" };
  }

  // Dummy check: reject if card ends with 0000 (simulating invalid card)
  if (cardNumber.endsWith("0000")) {
    return { valid: false, message: "Invalid card number" };
  }

  return { valid: true };
};

export const processPayment = async (req, res) => {
  const paymentSchema = z
    .object({
      courseId: z.string().min(1, "Course ID is required"),
      cardNumber: z.string().length(16, "Card number must be 16 digits"),
      cardHolder: z.string().min(3, "Card holder name is required"),
      expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
      expiryYear: z.string().regex(/^\d{2}$/, "Invalid year"),
      cvv: z.string().length(3, "CVV must be 3 digits"),
      pin: z.string().length(4, "PIN must be 4 digits"),
    })
    .strict();

  try {
    const validatedData = paymentSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    const { courseId, cardNumber, cardHolder, expiryMonth, expiryYear, cvv, pin } =
      validatedData.data;
    const userId = req.userId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }

    // Check if already purchased
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ errors: "Course already purchased" });
    }

    // Validate card (dummy validation)
    const cardValidation = validateCard(cardNumber, cvv, pin);
    if (!cardValidation.valid) {
      return res.status(400).json({ errors: cardValidation.message });
    }

    // Check expiry date
    const currentYear = new Date().getFullYear() % 100; // Last 2 digits
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(expiryYear);
    const expMonth = parseInt(expiryMonth);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return res.status(400).json({ errors: "Card has expired" });
    }

    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create payment record
    const payment = await Payment.create({
      userId,
      courseId,
      amount: course.price,
      cardLastFour: cardNumber.slice(-4),
      transactionId,
      status: "success",
    });

    // Create purchase record
    const purchase = await Purchase.create({
      userId,
      courseId,
    });

    res.status(200).json({
      message: "Payment successful",
      transactionId,
      purchase,
    });
  } catch (error) {
    console.log("Error in payment processing", error);
    res.status(500).json({
      errors: "Payment processing failed",
      error: error.message,
    });
  }
};