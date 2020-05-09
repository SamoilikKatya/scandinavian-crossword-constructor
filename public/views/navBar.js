let Navbar = {
    render: async linkArr => {
        return `
        <header>
            <div class="header-container">
                <div class="logo">
                    <img src="img/logo.png" width="60px" height="60px" alt="">
                </div>
                    <input type="checkbox" id="menu-checkbox">
                    <nav role="navigation">
                        <label for="menu-checkbox" class="toggle-button"
                        data-open="Меню" data-close="Закрыть" onclick></label>
                        <ul class="main-menu">
                            ${linkArr.map(el => Navbar.renderLink(el.link, el.title)).join('')}
                        </ul>
                    </nav>
            </div>
        </header>
        `
    },

    renderLink: (link, title) => {
        return `
            <li><a href="${link}">${title}</a></li>
        `
    },

    afterRender: async () => {

    }
};

export default Navbar;