import stories from './pages/stories.js'

new Navigo(null, true, '#');

export default class RouterHandler{
    constructor(){
        this.createroutes()
    }

    createroutes(){
        const routes = [
            {path: '/', page: stories}, 
            {path: '/new', page: stories}, 
            {path: '/ask', page: stories}, 
            {path: '/show', page: stories},    
        ];

        routes.forEach(route => {
            route.on(route.path, ()=>{
                route.page(route.path);
            }).resolve();
        })
    }
}