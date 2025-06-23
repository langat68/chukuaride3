import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  decimal,
  timestamp,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core'

// Enums
export const userRole = pgEnum('user_role', ['admin', 'staff', 'customer'])
export const fuelType = pgEnum('fuel_type', ['petrol', 'diesel', 'electric', 'hybrid'])
export const transmission = pgEnum('transmission', ['automatic', 'manual'])
export const rentalStatus = pgEnum('rental_status', ['booked', 'ongoing', 'completed', 'cancelled'])

// Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(), // 👈 Changed from uuid to serial
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: userRole('role').default('customer').notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
})

// Cars
export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  make: varchar('make', { length: 255 }),
  model: varchar('model', { length: 255 }),
  year: integer('year'),
  category: varchar('category', { length: 100 }),
  pricePerHour: decimal('price_per_hour', { precision: 10, scale: 2 }),
  pricePerDay: decimal('price_per_day', { precision: 10, scale: 2 }),
  fuel: fuelType('fuel'),
  transmission: transmission('transmission'),
  capacity: integer('capacity'),
  availability: boolean('availability').default(true),
  location: varchar('location', { length: 255 }),
  createdBy: integer('created_by').references(() => users.id), // 👈 Changed from uuid to integer
  createdAt: timestamp('created_at').defaultNow(),
})

// Car Images
export const carImages = pgTable('car_images', {
  id: serial('id').primaryKey(),
  carId: integer('car_id').references(() => cars.id).notNull(),
  imageUrl: text('image_url').notNull(),
})

// Bookings
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(), // 👈
  carId: integer('car_id').references(() => cars.id).notNull(),
  pickupTime: timestamp('pickup_time').notNull(),
  returnTime: timestamp('return_time').notNull(),
  priceEstimate: decimal('price_estimate', { precision: 10, scale: 2 }),
  confirmed: boolean('confirmed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

// Rentals
export const rentals = pgTable('rentals', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id').references(() => bookings.id).notNull(),
  status: rentalStatus('status').default('booked').notNull(),
  durationHours: integer('duration_hours'),
  totalCost: decimal('total_cost', { precision: 10, scale: 2 }),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
})

// Payments
export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  rentalId: integer('rental_id').references(() => rentals.id).notNull(),
  paymentProvider: varchar('provider', { length: 100 }),
  amount: decimal('amount', { precision: 10, scale: 2 }),
  paidAt: timestamp('paid_at').defaultNow(),
  refundAmount: decimal('refund_amount', { precision: 10, scale: 2 }),
  invoiceUrl: text('invoice_url'),
  status: varchar('status', { length: 50 }).default('pending'),
  receipt: varchar('receipt', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  checkoutRequestId: varchar('checkout_request_id', { length: 100 }), // <-- 🆕 add this!
})


// Feedback
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // 👈
  carId: integer('car_id').references(() => cars.id),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Support Requests
export const supportRequests = pgTable('support_requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id), // 👈
  message: text('message').notNull(),
  responded: boolean('responded').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

import { relations } from 'drizzle-orm'

export const bookingsRelations = relations(bookings, ({ one }) => ({
  car: one(cars, {
    fields: [bookings.carId],
    references: [cars.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}))
