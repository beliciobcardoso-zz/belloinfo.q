'use strict'
module.exports = {
    create(request, respond) {
        let roomId = 271177;
        respond.redirect(`/room/${roomId}`);
    }
}