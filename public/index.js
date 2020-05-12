import Registration from './views/register.js';
import Autorization from './views/autorization.js';
import Constructor from './views/constructor.js';
import Solver from './views/solver.js';
import Portfolio from './views/portfolio.js';

import Utils from './services/utils.js';

import Navbar from './views/navBar.js';



const routes = {
    '/': Autorization,
    '/register': Registration,
    '/construct': Constructor,
    '/solve': Solver,
    '/portf': Portfolio
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const header = null || document.querySelector('header');
    const content = null || document.querySelector('main');


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();
    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    await page.afterRender();

    // Render the Header of the page
    if(request.resource == '' || request.resource == 'register') {
        header.innerHTML = await Navbar.render([]);
    } else if(request.resource == 'construct') {
        header.innerHTML = await Navbar.render([{link: '#/portf', title: 'Портфолио'},
                                                {link: '#/solve', title: 'Решить'},
                                                {link: '#/', title: 'Выйти'}]);
    } else if(request.resource == 'portf') {
        header.innerHTML = await Navbar.render([{link: '#/construct', title: 'Создать'},
                                                {link: '#/solve', title: 'Решить'},
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
window.addEventListener('load', () => {
    window.location.hash = '/';
    auth.signOut();
    router();
});