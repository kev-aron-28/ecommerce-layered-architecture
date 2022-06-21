import mongoose from 'mongoose';

class Database {
    constructor() {}
    async connect() {
        try {
            await mongoose.connect('mongodb+srv://root:7Pu6EqO6wuRECHt5@cluster0.rtvsf.mongodb.net/devf');
            console.log('Database connected');
        } catch (error) {
            throw new Error('Error with database connection: ' + error);
        }
    }
}

export default Database;