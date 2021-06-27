'use strict'
const dataBase = require('../db/config');

module.exports = {

    async create(request, response) {
        const db = await dataBase();
        const pass = request.body.password;
        let roomId = "";
        let isRoom = true;

        while (isRoom) {
            for (let index = 0; index < 6; index++) {
                roomId += Math.floor(Math.random() * 10).toString();
            }
            roomId = parseInt(roomId);

            const roomsExistIds = await db.all(`SELECT id FROM rooms`);

            isRoom = roomsExistIds.some(roomsExistId => roomsExistId == roomId);
        }

        await db.run(`INSERT INTO rooms (id, pass) VALUES (${roomId}, ${pass}) `);

        await db.close();

        response.redirect(`/room/${roomId}`);
    },
    async open(request, response) {
        const db = await dataBase();

        let roomId = request.params.room;
        roomId = parseInt(roomId);

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and status = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and status = 1`);
        let isNoQuestions;

        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true;
            }
        }

        response.render('room', { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions });


        await db.close();        
    },
    enter(request, response) {

        let roomId = request.body.roomId

        response.redirect(`/room/${roomId}`);

    }
}