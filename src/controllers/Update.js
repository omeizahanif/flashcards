import R from 'ramda';

const MSGS = {
    SHOW_FORM: 'SHOW_FORM',
    QUESTION_INPUT: 'QUESTION_INPUT',
    ANSWER_INPUT: 'ANSWER_INPUT',
    CREATE_CARD: 'CREATE_CARD',
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

    }
}

export default update;