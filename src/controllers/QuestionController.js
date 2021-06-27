'use strict'
const dataBase = require('../db/config');

module.exports = {
    async index(request, response) {
        const db = await dataBase();

        const roomId = request.params.room;
        const questionId = request.params.question;
        const action = request.params.action;
        const password = request.body.password;

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`);

        if (verifyRoom.pass == password) {
            if (action == "delete") {

                await db.run(`DELETE FROM questions WHERE id = ${questionId}`);

            } else if (action == "check") {

                await db.run(`UPDATE questions SET status = 1 WHERE id = ${questionId}`);
            }
            response.redirect(`/room/${roomId}`);
        } else {
            response.render(`passincorrect`, { roomId: roomId });

        }

    },
    async create(request, response) {
        const db = await dataBase();
        const question = request.body.question;
        const status = 0;
        const roomId = request.params.room;

        await db.run(`INSERT INTO questions (title, status, room) VALUES ("${question}",${status}, ${roomId}) `);

        response.redirect(`/room/${roomId}`);

        await db.close();
    }
}
