import { db } from '../db/db.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { hashPassword, comparePassword } from './utils/hash.js';
import { createToken } from './utils/jwt.js';
export class AuthService {
    // Signup logic
    async signup({ email, password, name, role = 'customer' }) {
        // Check if email is taken
        const existing = await db.select().from(users).where(eq(users.email, email));
        if (existing.length > 0) {
            throw new Error('Email already registered');
        }
        // Hash the password
        const hashed = await hashPassword(password);
        // Insert user into DB
        const [user] = await db
            .insert(users)
            .values({
            email,
            passwordHash: hashed,
            name,
            role
        })
            .returning({
            id: users.id,
            email: users.email,
            role: users.role,
            name: users.name
        });
        // Generate JWT token
        const token = createToken({ id: user.id, role: user.role });
        return { user, token };
    }
    // Login logic
    async login({ email, password }) {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user)
            throw new Error('User not found');
        const valid = await comparePassword(password, user.passwordHash);
        if (!valid)
            throw new Error('Invalid credentials');
        const token = createToken({ id: user.id, role: user.role });
        return token;
    }
}
