import hh from 'hyperscript-helpers';
import * as R from 'ramda';
import { h } from 'virtual-dom';
import { saveQuestionInput, showFormMsg, saveAnswerInput, createCardMsg, editQuestionMsg, showAnswerMsg } from '../controllers/Update';


const { pre, div, p, h2, h1, form, label, textarea, button, i, article } = hh(h);

function cardDiv(dispatch, card) {
    const { question, answer, id, showAnswer } = card;
    let value = showAnswer ? 'dib' : 'dn';
    //console.log({ question, answer });
    return div({ className: "outline w-45 pa2 mr2 mt2 bg-light-yellow"}, [
        i({
            className: "fas fa-trash fr pointer",
            //onclick: () => dispatch()
        }),
        div([
            h2({ onclick: () => dispatch(editQuestionMsg(id))}, "Question"),
            p(question),
        ]),
        div([
            h2({onclick: () => dispatch(showAnswerMsg(id))}, "Answer"),
            p({className: `${value}` }, answer),
            div([
                ratingButton(dispatch, "bg-red", "bad", value),
                ratingButton(dispatch, "bg-blue", "good", value),
                ratingButton(dispatch, "bg-green", "great", value)
            ])
        ])
    ])
}

function ratingButton(dispatch, color, text, displayValue) {
    return button(
        {
            className: `f6 link dim br2 ph3 pv2 mb2 ${displayValue} white ${color}`,
           // onclick: () => dispatch(MSGS.SHOW_FORM)
        },
        text
    )
}
function createFormField(labelText, oninput, inputValue) {
    return div(
        [
            label({ className: "f6 b db mv3"}, labelText),
            textarea({
                className: "db border-box w-100 b--black-20 pa2 br2 mv3",
                oninput,
                value: inputValue
            })
        ]
    )
}


function cardForm(dispatch, model) {

    const { showCardForm, question, answer, editID } = model;
    if (showCardForm) {
        return form({ className: "outline w-25 pa3 mr2 mt4 bg-light-yellow" }, [
            i({
                className: "fas fa-trash fr pointer",
                onclick: () => dispatch(showFormMsg(false))
            }),
            createFormField("Question", (e) => dispatch(saveQuestionInput(e.target.value)), question),
            createFormField("Answer", (e) => dispatch(saveAnswerInput(e.target.value)), answer),
            button(
                {
                    className: "f6 br2 ph3 pv2 mb2 white bg-dark-blue",
                    type: "submit",
                    onclick: () => dispatch(createCardMsg(question, answer))
                }, "Save")
        ])
    }
    return button(
        {
            className: "f6 dim br2 ph3 pv2 ma2 dib white bg-dark-green",
            onclick: () => dispatch(showFormMsg(true))
        },
        "+ Add Flashcard")
}

function cardContainer(dispatch, model) {
    const { cards } = model;
    let row = [];

    if (cards) {
        row = R.map(card => cardDiv(dispatch, card));
    }

    return row(cards);
} 


function view(dispatch, model) {
    return div({ className: "tc-l mt4 mt5-m mt6-l ph3" }, [
        h1({ className: "f2 f1-l fw2 mb0 lh-title bb bw2 tl" }, "Flashcards"),
        article({ className: "flex items-start"}, [
            cardForm(dispatch, model),
            cardContainer(dispatch, model)
        ]),
        pre({className: "tc-l w-100 mh3 ph2" }, JSON.stringify(model, null, 2))
    ])

}

export default view;