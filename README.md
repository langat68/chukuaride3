```
npm install
npm run dev
```

```
open http://localhost:3000
```
{
  "users": [
    {
      "id": 1,
      "email": "admin@carrental.com",
      "passwordHash": "$2b$10$abcdefghijklmnopqrstuvwxyz",
      "role": "admin",
      "name": "John Admin",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "email": "jane.doe@email.com",
      "passwordHash": "$2b$10$zyxwvutsrqponmlkjihgfedcba",
      "role": "customer",
      "name": "Jane Doe",
      "createdAt": "2024-02-20T14:45:00Z"
    },
    {
      "id": 3,
      "email": "staff@carrental.com",
      "passwordHash": "$2b$10$1234567890abcdefghijklmnop",
      "role": "staff",
      "name": "Mike Staff",
      "createdAt": "2024-01-10T09:00:00Z"
    },
    {
      "id": 4,
      "email": "customer2@email.com",
      "passwordHash": "$2b$10$qwertyuiopasdfghjklzxcvbnm",
      "role": "customer",
      "name": "Sarah Wilson",
      "createdAt": "2024-03-05T16:20:00Z"
    }
  ],

  "cars": [
    {
      "id": 1,
      "make": "Toyota",
      "model": "Camry",
      "year": 2023,
      "category": "sedan",
      "pricePerHour": "15.00",
      "pricePerDay": "120.00",
      "fuel": "petrol",
      "transmission": "automatic",
      "capacity": 5,
      "availability": true,
      "location": "Downtown Branch",
      "createdBy": 1,
      "createdAt": "2024-01-16T11:00:00Z"
    },
    {
      "id": 2,
      "make": "Tesla",
      "model": "Model 3",
      "year": 2024,
      "category": "electric",
      "pricePerHour": "25.00",
      "pricePerDay": "200.00",
      "fuel": "electric",
      "transmission": "automatic",
      "capacity": 5,
      "availability": true,
      "location": "Airport Branch",
      "createdBy": 1,
      "createdAt": "2024-01-20T13:30:00Z"
    },
    {
      "id": 3,
      "make": "BMW",
      "model": "3 Series",
      "year": 2023,
      "category": "luxury",
      "pricePerHour": "35.00",
      "pricePerDay": "280.00",
      "fuel": "diesel",
      "transmission": "manual",
      "capacity": 5,
      "availability": false,
      "location": "City Center Branch",
      "createdBy": 3,
      "createdAt": "2024-01-25T16:20:00Z"
    },
    {
      "id": 4,
      "make": "Honda",
      "model": "Civic",
      "year": 2022,
      "category": "compact",
      "pricePerHour": "12.00",
      "pricePerDay": "95.00",
      "fuel": "petrol",
      "transmission": "manual",
      "capacity": 5,
      "availability": true,
      "location": "Downtown Branch",
      "createdBy": 3,
      "createdAt": "2024-02-01T10:15:00Z"
    },
    {
      "id": 5,
      "make": "Toyota",
      "model": "Prius",
      "year": 2023,
      "category": "hybrid",
      "pricePerHour": "18.00",
      "pricePerDay": "145.00",
      "fuel": "hybrid",
      "transmission": "automatic",
      "capacity": 5,
      "availability": true,
      "location": "Airport Branch",
      "createdBy": 1,
      "createdAt": "2024-02-10T14:30:00Z"
    }
  ],

  "carImages": [
    {
      "id": 1,
      "carId": 1,
      "imageUrl": "https://images.carrental.com/toyota-camry-front.jpg"
    },
    {
      "id": 2,
      "carId": 1,
      "imageUrl": "https://images.carrental.com/toyota-camry-interior.jpg"
    },
    {
      "id": 3,
      "carId": 2,
      "imageUrl": "https://images.carrental.com/tesla-model3-exterior.jpg"
    },
    {
      "id": 4,
      "carId": 2,
      "imageUrl": "https://images.carrental.com/tesla-model3-interior.jpg"
    },
    {
      "id": 5,
      "carId": 3,
      "imageUrl": "https://images.carrental.com/bmw-3series-side.jpg"
    },
    {
      "id": 6,
      "carId": 4,
      "imageUrl": "https://images.carrental.com/honda-civic-front.jpg"
    },
    {
      "id": 7,
      "carId": 5,
      "imageUrl": "https://images.carrental.com/toyota-prius-exterior.jpg"
    }
  ],

  "bookings": [
    {
      "id": 1,
      "userId": 2,
      "carId": 1,
      "pickupTime": "2024-03-15T09:00:00Z",
      "returnTime": "2024-03-17T18:00:00Z",
      "priceEstimate": "360.00",
      "confirmed": true,
      "createdAt": "2024-03-10T14:20:00Z"
    },
    {
      "id": 2,
      "userId": 2,
      "carId": 2,
      "pickupTime": "2024-04-01T10:00:00Z",
      "returnTime": "2024-04-01T16:00:00Z",
      "priceEstimate": "150.00",
      "confirmed": true,
      "createdAt": "2024-03-25T11:45:00Z"
    },
    {
      "id": 3,
      "userId": 4,
      "carId": 3,
      "pickupTime": "2024-04-20T08:00:00Z",
      "returnTime": "2024-04-22T20:00:00Z",
      "priceEstimate": "840.00",
      "confirmed": false,
      "createdAt": "2024-04-15T13:10:00Z"
    },
    {
      "id": 4,
      "userId": 4,
      "carId": 4,
      "pickupTime": "2024-05-01T12:00:00Z",
      "returnTime": "2024-05-03T12:00:00Z",
      "priceEstimate": "190.00",
      "confirmed": true,
      "createdAt": "2024-04-25T09:30:00Z"
    },
    {
      "id": 5,
      "userId": 2,
      "carId": 5,
      "pickupTime": "2024-05-15T08:00:00Z",
      "returnTime": "2024-05-15T20:00:00Z",
      "priceEstimate": "216.00",
      "confirmed": true,
      "createdAt": "2024-05-10T16:45:00Z"
    }
  ],

  "rentals": [
    {
      "id": 1,
      "bookingId": 1,
      "status": "completed",
      "durationHours": 57,
      "totalCost": "360.00",
      "startedAt": "2024-03-15T09:15:00Z",
      "endedAt": "2024-03-17T18:30:00Z"
    },
    {
      "id": 2,
      "bookingId": 2,
      "status": "completed",
      "durationHours": 6,
      "totalCost": "150.00",
      "startedAt": "2024-04-01T10:05:00Z",
      "endedAt": "2024-04-01T16:10:00Z"
    },
    {
      "id": 3,
      "bookingId": 4,
      "status": "ongoing",
      "durationHours": 48,
      "totalCost": "190.00",
      "startedAt": "2024-05-01T12:10:00Z",
      "endedAt": null
    },
    {
      "id": 4,
      "bookingId": 5,
      "status": "booked",
      "durationHours": null,
      "totalCost": "216.00",
      "startedAt": null,
      "endedAt": null
    }
  ],

  "payments": [
    {
      "id": 1,
      "rentalId": 1,
      "paymentProvider": "M-Pesa",
      "amount": "360.00",
      "paidAt": "2024-03-15T08:45:00Z",
      "refundAmount": null,
      "invoiceUrl": "https://invoices.carrental.com/inv-001.pdf",
      "status": "completed",
      "receipt": "MP240315001",
      "phone": "+254712345678",
      "checkoutRequestId": "ws_CO_15032024084500123"
    },
    {
      "id": 2,
      "rentalId": 2,
      "paymentProvider": "M-Pesa",
      "amount": "150.00",
      "paidAt": "2024-04-01T09:30:00Z",
      "refundAmount": null,
      "invoiceUrl": "https://invoices.carrental.com/inv-002.pdf",
      "status": "completed",
      "receipt": "MP240401002",
      "phone": "+254798765432",
      "checkoutRequestId": "ws_CO_01042024093000456"
    },
    {
      "id": 3,
      "rentalId": 3,
      "paymentProvider": "M-Pesa",
      "amount": "190.00",
      "paidAt": "2024-05-01T11:15:00Z",
      "refundAmount": null,
      "invoiceUrl": "https://invoices.carrental.com/inv-003.pdf",
      "status": "completed",
      "receipt": "MP240501003",
      "phone": "+254723456789",
      "checkoutRequestId": "ws_CO_01052024111500789"
    },
    {
      "id": 4,
      "rentalId": 4,
      "paymentProvider": "M-Pesa",
      "amount": "216.00",
      "paidAt": null,
      "refundAmount": null,
      "invoiceUrl": null,
      "status": "pending",
      "receipt": null,
      "phone": "+254712345678",
      "checkoutRequestId": "ws_CO_10052024164500321"
    }
  ],

  "feedback": [
    {
      "id": 1,
      "userId": 2,
      "carId": 1,
      "rating": 5,
      "comment": "Excellent car, very clean and reliable. Great service!",
      "createdAt": "2024-03-18T10:00:00Z"
    },
    {
      "id": 2,
      "userId": 2,
      "carId": 2,
      "rating": 4,
      "comment": "Good electric car, charging was convenient. Minor issue with the app.",
      "createdAt": "2024-04-01T17:30:00Z"
    },
    {
      "id": 3,
      "userId": 4,
      "carId": 4,
      "rating": 3,
      "comment": "Car was okay, but had some minor mechanical issues. Staff was helpful though.",
      "createdAt": "2024-05-02T14:20:00Z"
    }
  ],

  "supportRequests": [
    {
      "id": 1,
      "userId": 2,
      "message": "I need help extending my rental period. Can someone assist?",
      "responded": true,
      "createdAt": "2024-03-16T15:20:00Z"
    },
    {
      "id": 2,
      "userId": 2,
      "message": "The car key is not working properly. Please help.",
      "responded": true,
      "createdAt": "2024-04-01T12:15:00Z"
    },
    {
      "id": 3,
      "userId": 4,
      "message": "I found a scratch on the car that wasn't there during pickup. What should I do?",
      "responded": false,
      "createdAt": "2024-05-01T18:30:00Z"
    },
    {
      "id": 4,
      "userId": 4,
      "message": "How do I cancel my upcoming booking?",
      "responded": false,
      "createdAt": "2024-05-12T10:45:00Z"
    }
  ]
}


//admin

{
  "name": "admin",
  "email": "admin2@example.com",
  "password": "admin123",
  "role": "admin"
}
