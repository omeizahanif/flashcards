import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';


function AppManager(model, view, update, node) {
    let updateModel = model;
    let currentView = view(dispatch, updateModel);
    let rootNode = createElement(currentView);
    console.log(rootNode);
   // node.appendChild(currentView /*rootNode*/);

    function dispatch(msg) {
        updateModel = update(msg, model);
       /* const updatedView = view(dispatch, updateModel);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);*/
        const updatedView = view(dispatch, model);
        node.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
}

export default AppManager;