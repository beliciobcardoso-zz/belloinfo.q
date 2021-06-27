'use strict'
const dataBase = require('../db/config');

module.exports = {

    async create(request, respond) {
        const db = await dataBase();
        const pass = request.body.password;
        let roomId = "";
        let isRoom = true;

        while (isRoom) {
            for (let index = 0; index < 6; index++) {
                roomId += Math.floor(Math.random() * 10).toString();
            }

            const roomsExistIds = await db.all(`SELECT id FROM rooms`);

            isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId);
        }

        await db.run(`INSERT INTO rooms (id, pass) VALUES (${parseInt(roomId)}, ${pass}) `);

        await db.close();

        respond.redirect(`/room/${roomId}`);
    },
    async open(request, respond) {
        const db = await dataBase();

        const roomId = request.params.room;

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and status = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and status = 1`);
         let isNoQuestions;
 
         if (questions.length == 0) {
             if (questionsRead.length == 0) {
                 isNoQuestions = true;
             }
         }

        respond.render('room', { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions });

        await db.close();

        respond.redirect(`/room/${roomId}`);
    },
    enter(request, respond) {

        let roomId = request.body.roomId
        roomId = 30193

        respond.redirect(`/room/${roomId}`);

    }
}