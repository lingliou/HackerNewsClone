import view from '../utils/view.js';
import Story from '../components/Story.js';
import baseURL from '../utils/baseURL.js';

export default async function Item(){
    let story;
    let hasComments;
    let hasError = false;
    try{
        story = await getStory();
        hasComments = story.comments.length > 0;
    }
    catch(error){
        hasError = true;
        console.error(error);
    }
    
    if(hasError === true){
        view.innerHTML= `<div class="error">Error fetching</div>`
    }
    view.innerHTML= `<div>
    ${Story(story)}
    <hr>
    ${hasComments ? story.comments.map(comment => 
        JSON.stringify(comment)).join('') : "No Comments"}
    </div>`

}

async function getStory(){
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseURL}/item/${storyId}`);
    const story = await response.json();
    return story;
}