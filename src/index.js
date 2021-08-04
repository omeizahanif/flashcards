import AppManager from './app';
import view from './views/View';
import initModel from './model/Model';
import update from './controllers/Update';


const node = document.getElementById("app");

AppManager(initModel, view, update, node);