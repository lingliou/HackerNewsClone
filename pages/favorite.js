import store from '../store.js';
import Story from '../components/Story.js';
import view from '../utils/view.js';
import checkFavorite from '../utils/checkFavorite.js';

export default function Favorite(){
    const {favorites} = store.getState();
    const isFavorite = favorites.length > 0;

    view.innerHTML= `<div> 
    ${isFavorite ? 
    favorites.map(favorite => Story({
        ...favorite, 
        isFavorite: checkFavorite(favorites, favorite)
    })).join('')
    : 'No Favorited Stories'}
    </div>`

    document.querySelectorAll('.favorite').forEach(element => {
        element.addEventListener('click', function() {
          const story = JSON.parse(this.dataset.story);  
          const isFavorited = checkFavorite(favorites, story);
          store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story } })  
          Favorite();
        }); 
     });

}