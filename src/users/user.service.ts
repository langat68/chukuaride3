import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { users, userRole } from '../db/schema.js'
import bcrypt from 'bcrypt'

// Initialize your database connection here
// const db = drizzle(pool) // You'll need to set this up

export interface CreateUserData {
  email: string
  password: string
  role?: 'admin' | 'staff' | 'customer'
  name?: string
}

export interface UpdateUserData {
  email?: string
  password?: string
  role?: 'admin' | 'staff' | 'customer'
  name?: string
}

export class UserService {
  constructor(private db: any) {} // Replace with proper DB type

  async createUser(userData: CreateUserData) {
    try {
      // Hash password
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(userData.password, saltRounds)

      const [newUser] = await this.db
        .insert(users)
        .values({
          email: userData.email,
          passwordHash,
          role: userData.role || 'customer',
          name: userData.name,
        })
        .returning({
          id: users.id,
          email: users.email,
          role: users.role,
          name: users.name,
          createdAt: users.createdAt,
        })

      return newUser
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`)
    }
  }

  async getAllUsers() {
    try {
      const allUsers = await this.db
        .select({
          id: users.id,
          email: users.email,
          role: users.role,
          name: users.name,
          createdAt: users.createdAt,
        })
        .from(users)

      return allUsers
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`)
    }
  }

  async getUserById(id: number) {
    try {
      const [user] = await this.db
        .select({
          id: users.id,
          email: users.email,
          role: users.role,
          name: users.name,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, id))

      return user || null
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error}`)
    }
  }

  async getUserByEmail(email: string) {
    try {
      const [user] = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))

      return user || null
    } catch (error) {
      throw new Error(`Failed to fetch user by email: ${error}`)
    }
  }

  async updateUser(id: number, updateData: UpdateUserData) {
    try {
      const updateValues: any = {}

      if (updateData.email) updateValues.email = updateData.email
      if (updateData.role) updateValues.role = updateData.role
      if (updateData.name) updateValues.name = updateData.name
      
      if (updateData.password) {
        const saltRounds = 10
        updateValues.passwordHash = await bcrypt.hash(updateData.password, saltRounds)
      }

      const [updatedUser] = await this.db
        .update(users)
        .set(updateValues)
        .where(eq(users.id, id))
        .returning({
          id: users.id,
          email: users.email,
          role: users.role,
          name: users.name,
          createdAt: users.createdAt,
        })

      return updatedUser || null
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`)
    }
  }

  async deleteUser(id: number) {
    try {
      const [deletedUser] = await this.db
        .delete(users)
        .where(eq(users.id, id))
        .returning({
          id: users.id,
          email: users.email,
        })

      return deletedUser || null
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`)
    }
  }

  async verifyPassword(email: string, password: string) {
    try {
      const user = await this.getUserByEmail(email)
      if (!user) return null

      const isValid = await bcrypt.compare(password, user.passwordHash)
      return isValid ? user : null
    } catch (error) {
      throw new Error(`Failed to verify password: ${error}`)
    }
  }
}