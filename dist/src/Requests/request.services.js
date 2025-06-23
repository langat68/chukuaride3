// src/requests/support.service.ts
import { db } from '../db/db.js';
import { supportRequests } from '../db/schema.js';
import { eq } from 'drizzle-orm';
export class SupportService {
    async create(data) {
        const result = await db.insert(supportRequests).values(data).returning();
        return result[0];
    }
    async getAll() {
        return db.select().from(supportRequests);
    }
    async getById(id) {
        const result = await db.select().from(supportRequests).where(eq(supportRequests.id, id));
        return result[0];
    }
    async update(id, data) {
        const result = await db
            .update(supportRequests)
            .set(data)
            .where(eq(supportRequests.id, id))
            .returning();
        return result[0];
    }
    async delete(id) {
        return db.delete(supportRequests).where(eq(supportRequests.id, id));
    }
}
