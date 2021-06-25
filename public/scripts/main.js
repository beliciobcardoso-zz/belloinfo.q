'use strict'
import Modal from './modal.js';

const variaveisDOM = {
    checkButtons: document.querySelectorAll('.actions a#check'),
    deleteButtons: document.querySelectorAll('.actions a#delete'),
    closeModal: document.querySelector('#cancelar'),
    modalTitle: document.querySelector('.modal h2'),
    modalDescription: document.querySelector('.modal p'),
    modalButton: document.querySelector('.modal button'),
    form: document.querySelector('.modal form'),
    roomId: document.querySelector('#room-id')
}

variaveisDOM.closeModal.addEventListener('click', event => {
    Modal();
});

variaveisDOM.checkButtons.forEach(button => {
    button.addEventListener('click', handleClick);
});

variaveisDOM.deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
    event.preventDefault();
    const text = check ? "Marca como lida" : "Excluir";
    const slug = check ? "check" : "delete";
    const roomId = variaveisDOM.roomId.dataset.id;
    const questionId = event.target.dataset.id;

    variaveisDOM.form.setAttribute('action', `/room/${roomId}/${questionId}/${slug}`);

    variaveisDOM.modalTitle.textContent = `${text} esta pergunta?`;
    variaveisDOM.modalDescription.textContent = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`;
    variaveisDOM.modalButton.textContent = `Sim, ${text.toLocaleLowerCase()}`;
    check ? variaveisDOM.modalButton.classList.remove('red') : variaveisDOM.modalButton.classList.add('red');

    Modal();
}