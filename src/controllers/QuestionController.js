'use strict'
module.exports = {
    index(request, respond) {
        const roomId = request.params.room
        const questionId = request.params.question
        const action = request.params.action
        const password = request.body.password

        console.log(`roomId = ${roomId}, questionId = ${questionId}, action = ${action}, password = ${password}`)
    }
}
