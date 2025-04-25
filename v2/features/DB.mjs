export default class DB {
    
    constructor(service) {
        this.service = service;
    }

    async getUser(id) {}

    async setUser(data) {}

    async deletUser(id) {}

    async addItem(userId, payload) {}

    async updateItem(userId, payload) {}

    async deleteItem(userId, itemId) {}
}