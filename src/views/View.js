import hh from 'hyperscript-helpers';
import R from 'ramda';
import { h } from 'virtual-dom';



const { pre, div, p, h2, h1, form, label, textarea, button, i, article } = hh(h);

function cardDiv(model) {
    return div({ className: "outline w-50 pa3 mr2 mt4 bg-light-yellow"}, [
        deleteButton("delete clicked"),
        div([
            h2({ onclick: console.log("question clicked")}, "Question"),
            p("ipsum lorem dolor amet")
        ]),
        div([
            h2({onclick: console.log("answer clicked")}, "Answer"),
            p("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."),
            div([
                ratingButton("bg-red", "bad clicked", "bad"),
                ratingButton("bg-blue", "good clicked", "good"),
                ratingButton("bg-green", "great clicked", "great")
            ])
        ])
    ])
}

function ratingButton(color, msg, text) {
    return button(
        {
            className: `f6 link dim br2 ph3 pv2 mb2 dib white ${color}`,
            onclick: console.log(msg)
        },
        text
    )
}
function createLabel(text, inputID) {
    return label(
        { for: inputID,
        className: "f6 b db mb2"
        }, text)
}

function createInputField(inputID) {
    return textarea(
        { 
            id: inputID,
            className: "db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2",
            //onInput, 
            placeholder: "Enter text here"
        }
    )
}

function addCardButton(msg) {
    return button(
        {
            className: "f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-green",
        },
        "+ Add Flashcard"
    )
}

function cardForm() {
    return form()
}

function saveButton(msg) {
    return button(
        {
            className: "f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue",
            onclick: console.log(msg)
        }
    )
}

function deleteButton(msg) {
    return i(
        {
            className: "fas fa-trash fr",
            onclick: console.log(msg)
        }
    )
}

function view(dispatch, model) {
    return div({ className: "tc-l mt4 mt5-m mt6-l ph3" }, [
        h1({ className: "f2 f1-l fw2 mb0 lh-title bb bw2 tl" }, "Flashcards"),
        article({ className: "flex"}, [
            cardDiv(model),
            cardDiv(model),
            cardDiv(model)
        ]),
        pre({className: "tc-l w-100 mh3 ph2" }, JSON.stringify(model, null, 2))
    ])

}

export default view;