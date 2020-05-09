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
                    <button id="registration">Регистрация</button>
                </div>
        </form>
        `;
    },
    
    afterRender: async () => {
        const btnRegistration = document.querySelector('#registration');
        const btnLogIn = document.querySelector('#log-in');
        const authForm = document.querySelector('#autorization');
        const main = document.querySelector('main');
        let isSucs = true;


        const goTo = async (e) => {
            e.preventDefault();
            main.innerHTML = await Registration.render();
            Registration.after_render();
        }

        btnRegistration.addEventListener('click', e => {
            e.preventDefault();
            window.location.hash = '/register';
        });

        btnLogIn.addEventListener('click', e => {
            e.preventDefault();
            const email = authForm['login'].value;
            const password = authForm['password'].value;
            auth.signInWithEmailAndPassword(email, password).catch(e => {
                alert(e.message);
                isSucs = false;
            })
            if (isSucs) {
                auth.onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                      alert(`Пользователь ${firebaseUser.email } успешно авторизовался!`);
                      window.location.hash = '/construct';
                    }
                  });
            }
        });

    }
};

export default Autorization;