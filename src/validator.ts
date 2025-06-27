import { z } from 'zod'

// Users
export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['admin', 'staff', 'customer']).optional()
})

// Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

// Cars
export const carSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().gte(1886),
  category: z.string(),
  pricePerHour: z.string(),
  pricePerDay: z.string(),
  fuel: z.enum(['petrol', 'diesel', 'electric', 'hybrid']),
  transmission: z.enum(['automatic', 'manual']),
  capacity: z.number().int().positive(),
  availability: z.boolean().optional(),
  location: z.string(),
  createdBy: z.number().int().positive()
})

// Bookings
export const bookingSchema = z.object({
  userId: z.number().int().positive(),
  carId: z.number().int().positive(),
  pickupTime: z.string().datetime(),
  returnTime: z.string().datetime(),
  priceEstimate: z.string().optional(),
  confirmed: z.boolean().optional()
})

// ✅ Rentals – for creation (from frontend)
export const createRentalSchema = z.object({
  userId: z.number().int().positive(),
  carId: z.number().int().positive(),
  pickupTime: z.string().datetime(),
  returnTime: z.string().datetime(),
  totalCost: z.string()
})

// ✅ Rentals – full object (for internal use or response shape)
export const rentalSchema = createRentalSchema.extend({
  bookingId: z.number().int().positive(),
  status: z.enum(['booked', 'ongoing', 'completed', 'cancelled']).optional(),
  durationHours: z.number().int().optional(),
  startedAt: z.string().datetime().optional(),
  endedAt: z.string().datetime().optional()
})

// Payments
export const paymentSchema = z.object({
  rentalId: z.number().int().positive(),
  paymentProvider: z.string(),
  amount: z.string(),
  refundAmount: z.string().optional(),
  invoiceUrl: z.string().url().optional()
})

// Feedback
export const feedbackSchema = z.object({
  userId: z.number().int(),
  carId: z.number().int(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional()
})

// Support Requests
export const supportRequestSchema = z.object({
  userId: z.number().int(),
  message: z.string().min(3)
})
