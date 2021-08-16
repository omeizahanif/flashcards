import * as R from 'ramda';

const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    QUESTION_INPUT: 'QUESTION_INPUT',
    ANSWER_INPUT: 'ANSWER_INPUT',
    CREATE_CARD: 'CREATE_CARD',
    EDIT_QUESTION: 'EDIT_QUESTION',
    SHOW_ANSWER: 'SHOW_ANSWER',

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

export function createCardMsg(question, answer) {
    return {
        type: MSGS.CREATE_CARD,
        question,
        answer
    }
}

export function editQuestionMsg(editID) {
    return {
        type: MSGS.EDIT_QUESTION,
        editID
    }
}

export function showAnswerMsg(id) {
    return {
        type: MSGS.SHOW_ANSWER,
        id
    }
}

function update(msg, model) {
    switch(msg.type) {
        case MSGS.SHOW_FORM: {
            const { showCardForm } = msg;
            return { ...model, showCardForm, question: "", answer: "" };
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
            const { question, answer } = msg;
            const { editID, cards } = model;
            if (editID == null) {
                return add(msg, model);
            }
            const updatedCards = R.map(card => {
                   if ( editID == card.id ) {
                       return { ...card, question, answer }
                   }
            }, cards);

            return { ...model, cards: updatedCards, question: '', answer: '', editID: null, showCardForm: false };
            
        }

        case MSGS.EDIT_QUESTION: {
            //find card with that id
            const { editID } = msg;
            const card = R.find(card => editID == card.id, model.cards);
            //turn on the showCardForm,
            //populate it with the card
            const { question, answer } = card;
            return { ...model, editID, showCardForm: true, question, answer }
        }

        case MSGS.SHOW_ANSWER: {
            const { cards } = model;
            const { id } = msg;
            const updatedCards = R.map(card => {
                if ( id == card.id ) {
                    return card.showAnswer ? { ...card, showAnswer: false } : { ...card, showAnswer: true };
                }
         }, cards);

         return { ...model, cards: updatedCards };

        }
    }
}

function add(msg, model) {
    const { question, answer } = msg;
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


export default update;