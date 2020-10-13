
function createStore(reducer){
    let currentState = reducer(undefined, {});
    return {
        getState: ()=>currentState,
        dispatch: action => {
            currentState = reducer(currentState, action);
        }
    }
}

const initialState = {
    favorite:[]
}

function favoriteReducer(state = initialState, action){
    switch(action.type){
        case "ADD_FAVORITE":{
            const addedFavorite = action.payload.favorite;
            const favorite = [...state.favorite, addedFavorite];
            return {favorite};}
        case "REMOVE_FAVORITE":{
            const removedFavorite = action.payload.favorite;
            const favorite = state.favorite.filter(item => item.id !== action.payload.id);
            return {favorite};}

        default:
            return state;

    }
}

const action = {
    type: "ADD_FAVORITE",
    payload: {favorite: {title:'story1', id:1}}
}

const store = createStore(favoriteReducer);
export default store;