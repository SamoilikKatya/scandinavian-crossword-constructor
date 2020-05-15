import Constructor from './constructor.js';

let Registration = {
    render: async () => {
        return `
        <form class="autorisation" id="registrationForm">
            <p align="center">Для использования сайта необходима регистрация</p>
            <input type="text" id="login" placeholder="Логин">
            <input type="password" id="password" placeholder="Пароль">
            <input type="password" id="confirm-password" placeholder="Подтвердите пароль">
            <button class="registr" id="registr">Зарегистрироваться</button>
        </form>
        `;
    },
    
    afterRender: async () => {
        window.location.hash = '/register';
        const btnReg = document.querySelector('#registr');
        const regForm = document.querySelector('#registrationForm');
        let isSucs = true;

        regForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = regForm['login'].value;
            const password = regForm['password'].value;
            const confPassword = regForm['confirm-password'].value;
            if (password != confPassword) {
                alert('Пароли не совпадают!');
            } else if (email == '' | password == '' | confPassword =='') {
                alert('Поля не могут быть пустыми!')
            } else {
                const promise = auth.createUserWithEmailAndPassword(email, password);
                promise.catch(e => {
                    alert(e.message);
                    isSucs = false;
                });
            }
            if (isSucs) {
                auth.onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                      alert(`Пользователь ${firebaseUser.email } успешно зарегистрирован!`);
                      window.location.hash = '/construct';
                    }
                });
            }
        });

    }
};

export default Registration;