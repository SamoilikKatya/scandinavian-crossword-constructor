import Registration from './register.js';
import Constructor from './constructor.js';


let Autorization = {
    render: async () => {
        return `
        <form class="autorisation" id="autorization">
                <p align="center">Добро пожаловать! Необходимо авторизоваться.</p>
                <input type="text" id="login" placeholder="Логин">
                <input type="password"id="password" placeholder="Пароль">
                <div class="buttons-autorization">
                    <button id="log-in">Вход</button>
                    <a id="registration" href="#/register">Регистрация</a>
                </div>
        </form>
        `;
    },
    
    afterRender: async () => {
        const authForm = document.querySelector('#autorization');
        const main = document.querySelector('main');
        let isSucs = true;


        const goTo = async (e) => {
            e.preventDefault();
            main.innerHTML = await Registration.render();
            Registration.after_render();
        }

        authForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = authForm['login'].value;
            const password = authForm['password'].value;
            auth.signInWithEmailAndPassword(email, password).then(() => {
                auth.onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                        alert(`Пользователь ${firebaseUser.email } успешно авторизовался!`);
                        window.location.hash = '/construct';
                    }
                });
            }).catch(e => {
                alert(e.message);
            });
        });

    }
};

export default Autorization;