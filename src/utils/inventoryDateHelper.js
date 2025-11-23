import { UnitEntities } from "../services/entities/Unit";

export class InventoryDateHelper {
    constructor(unit) {
        this.unit = unit;
    }
    // Create Date Object
    createdDate() {
        return new Date(this.unit.created_at);
    }

    // DAILY
    isCreatedToday() {
        const created = this.createdDate();
        const today = new Date();

        return (
            created.getFullYear() === today.getFullYear() &&
            created.getMonth() === today.getMonth() &&
            created.getDate() === today.getDate()
        );
    }

    // WEEKLY
    isCreatedThisWeek() {
        const created = this.createdDate();
        const today = new Date();

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
        endOfWeek.setHours(23, 59, 59, 999);

        return created >= startOfWeek && created <= endOfWeek;
    }

    // MONTHLY
    isCreatedThisMonth() {
        const created = this.createdDate();
        const today = new Date();

        return (
            created.getFullYear() === today.getFullYear() &&
            created.getMonth() === today.getMonth()
        );
    }

    // YEARLY
    isCreatedThisYear() {
        const created = this.createdDate();
        const today = new Date();

        return created.getFullYear() === today.getFullYear();
    }
}