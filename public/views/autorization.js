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
    
    after_render: async () => {
        const btnRegistration = document.querySelector('#registration');
        const btnLogIn = document.querySelector('#log-in');
        const authForm = document.querySelector('#autorization');
        const main = document.querySelector('main');
        let isSucs = true, isPress = false;


        const goTo = async (e) => {
            e.preventDefault();
            main.innerHTML = await Registration.render();
            Registration.after_render();
        }

        btnRegistration.addEventListener('click', e => goTo(e));

        btnLogIn.addEventListener('click', e => {
            isPress = true;
            e.preventDefault();
            const email = authForm['login'].value;
            const password = authForm['password'].value;
            auth.signInWithEmailAndPassword(email, password).catch(e => {
                alert(e.message);
                isSucs = false;
            })
            if (isSucs && isPress) {
                auth.onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                      alert(`Пользователь ${firebaseUser.email } успешно авторизовался!`);
                    }
                  });
            }
        });

    }
};

export default Autorization;