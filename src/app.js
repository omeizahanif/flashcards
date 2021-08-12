import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';


function AppManager(model, view, update, node) {
    let updateModel = model;
    let currentView = view(dispatch, updateModel);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        updateModel = update(msg, updateModel);
        const updatedView = view(dispatch, updateModel);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}

export default AppManager;