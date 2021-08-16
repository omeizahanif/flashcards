import * as R from 'ramda';

const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    QUESTION_INPUT: 'QUESTION_INPUT',
    ANSWER_INPUT: 'ANSWER_INPUT',
    CREATE_CARD: 'CREATE_CARD',
    EDIT_QUESTION: 'EDIT_QUESTION',
    SHOW_ANSWER: 'SHOW_ANSWER'

}

export function showFormMsg(showCardForm) {
    return {
        type: MSGS.SHOW_FORM,
        showCardForm
    }
}

export function saveQuestionInput(question) {
    return {
        type: MSGS.QUESTION_INPUT,
        question
    }
}

export function saveAnswerInput(answer) {
    return {
        type: MSGS.ANSWER_INPUT,
        answer
    }
}

export function createCardMsg(question, answer, id) {
    return {
        type: MSGS.CREATE_CARD,
        question,
        answer,
        id
    }
}

export function editQuestionMsg(editID) {
    return {
        type: MSGS.EDIT_QUESTION,
        editID
    }
}

function update(msg, model) {
    switch(msg.type) {
        case MSGS.SHOW_FORM: {
            const { showCardForm } = msg;
            return { ...model, showCardForm, question: "" };
        }
            
        case MSGS.QUESTION_INPUT: {
            const { question } = msg;
            return { ...model, question }
        }

        case MSGS.ANSWER_INPUT: {
            const { answer } = msg;
            return { ...model, answer }
        }

        case MSGS.CREATE_CARD: {
            const { question, answer, id } = msg;
            const { cards, nextID } = model;
            cards.push({
                question,
                answer,
                id: nextID,
                showAnswer: false,
                rating: null,
                showButtons: false
            })
            return { ...model, cards, question: '', answer: '', nextID: nextID + 1, showCardForm: false }
        }

        case MSGS.EDIT_QUESTION: {
            //find card with that id
            const { editID } = msg;
            const card = R.filter(card => id == card.id, model.cards);
            //turn on the showCardForm,
            //populate it with the card
            return { ...model, editID, showCardForm: true, question: card.question, answer: card.answer }
        }

    }
}

export default update;