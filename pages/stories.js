import view from '../utils/view.js';
import Story from '../components/Story.js';
import baseURL from '../utils/baseURL.js';
import store from '../store.js';
import checkFavorite from '../utils/checkFavorite.js';

export default async function Stories(path) {
  const {favorites} = store.getState();
  const stories = await getStories(path);
  const hasStories = stories.length > 0;
                    
  view.innerHTML = `<div>
    ${hasStories ?
    stories.map((story,index) => Story({...story, index: index +1, isFavorite: checkFavorite(favorites,story)})).join('') 
    : 'No stories'}    
  </div>`;   //index is for the Story components to show each news with a number on it.

  document.querySelectorAll('.favorite').forEach(element => {
      element.addEventListener('click', async function(){
          const story = JSON.parse(this.dataset.story);
          const isFavorited = checkFavorite(favorites, story);
          if (isFavorited){
              store.dispatch({type: "REMOVE_FAVORITE", payload:{favorite: story}})
          }else{
              store.dispatch({type: "ADD_FAVORITE", payload: {favorite: story}})
          }
          await Stories(path);
      } )
  })
}

async function getStories(path) {
  const isHomeRoute = path === '/';
  const isNewRoute = path === '/new';
  if (isHomeRoute) {
    path = '/news';  
  } else if (isNewRoute) {
    path = '/newest';  
  } 
  const response = await fetch(`${baseURL}${path}`);
  const stories = await response.json();
  return stories;
}



// API: https://node-hnapi.herokuapp.com

//   Our Path(Nav) -> API path
//   / (Top) -> /news
//   /new (New) -> /newest
//   /ask (Ask) -> /ask
//   /show (Show) -> /show