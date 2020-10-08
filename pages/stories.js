import view from '../utils/view.js'

export default function stories(path){
    view.innerHTML = `<div>${path}</div>`;
}