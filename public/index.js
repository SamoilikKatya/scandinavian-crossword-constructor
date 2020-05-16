import Registration from './views/register.js';
import Autorization from './views/autorization.js';
import Constructor from './views/constructor.js';
import Solver from './views/solver.js';
import Portfolio from './views/portfolio.js';
import Error404 from './views/error404.js';
import Answers from './views/answers.js';

import Utils from './services/utils.js';

import Navbar from './views/navBar.js';

let user = null;

const routes = {
    '/': Autorization,
    '/register': Registration,
    '/construct': Constructor,
    '/solve/:id': Solver,
    '/portf': Portfolio,
    '/answers/:id': Answers
};

const goToAnswers = color => {
    if(color == 'mine') {
        window.location.hash = '/answers';
    }
}

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    const all = [];
    // Lazy load view element:
    const header = null || document.querySelector('header');
    const content = null || document.querySelector('main');


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();
    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '');
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    if(page == Portfolio) {
        db.ref('crosswords').on('value', function(snapshot) {
            all.push(snapshot.val());
            content.innerHTML = page.render(all, user);
        });
        page.afterRender();
    } else if (page == Constructor) {
        content.innerHTML = await page.render(user);
        await page.afterRender();
    } else if(page == Answers) {
        db.ref('crosswords/' + request.id).on('value', function(snapshot) {
            content.innerHTML = page.render(snapshot.val().answers);
        });
        await page.afterRender();
    } else {
        content.innerHTML = await page.render(); 
        await page.afterRender();
    }
    
    
    // Render the Header of the page
    if(request.resource == '' || request.resource == 'register') {
        header.innerHTML = await Navbar.render([]);
    } else if(request.resource == 'construct') {
        header.innerHTML = await Navbar.render([{link: '#/portf', title: 'Портфолио'},
                                                {link: '#/solve/0', title: 'Решить'},
                                                {link: '#/', title: 'Выйти'}]);
    } else if(request.resource == 'portf') {
        header.innerHTML = await Navbar.render([{link: '#/construct', title: 'Создать'},
                                                {link: '#/solve/0', title: 'Решить'},
                                                {link: '#/', title: 'Выйти'}]);
    } else if(request.resource == 'solve') {
        header.innerHTML = await Navbar.render([{link: '#/portf', title: 'Портфолио'},
                                                {link: '#/construct', title: 'Создать'},
                                                {link: '#/', title: 'Выйти'}]);
    }
    await Navbar.afterRender();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            
            user = firebaseUser.email;
            window.location.hash = '/portf';
        } else {
            window.location.hash = '/';
        }
        router();
    });    
    
});