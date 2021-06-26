'use strict'
const dataBase = require('../db/config');

module.exports = {
    async create(request, respond) {
        const db = await dataBase();
        const pass = request.body.password;

        let roomId = "";

        for (let index = 0; index < 6; index++) {
            roomId += Math.floor(Math.random() * 10).toString();
        }
        roomId = parseInt(roomId);
        await db.run(`INSERT INTO rooms (id, pass) VALUES (${roomId}, ${pass}) `);

        await db.close();

        respond.redirect(`/room/${roomId}`);
    }
}