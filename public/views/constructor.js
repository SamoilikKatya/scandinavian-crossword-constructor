let Constructor = {
    render: async () => {
        Constructor.lenTR = 10;
        Constructor.lenTD = 10;
        return `
        <div class="content">
                <div class="crossword" id="crossword">
                    <div class="crossword-up">
                        <div class="crossword-table">
                            <table>
                                ${Constructor.renderTable()}
                            </table>
                        </div>
                        <div class="button-row">
                            <button class="up"></button>
                            <button class="down"></button>
                        </div>
                    </div>
                    <div class="button-column">
                        <button class="left"></button>
                        <button class="right"></button>
                    </div>
                </div>
                <div class="instructions" id="instructions">
                    <p class="instructuction"><b>Как составить кроссворд?</b><br>
                        <i>Шаг 1.</i> Укажите регион для добавления нового слова.<br>
                        <i>Шаг 2.</i> На правой панели введите своё слово.<br>
                        <i>Шаг 3.</i> Придумайте и запишите определение для слова.<br>
                        ...<br>
                        <i>Шаг 4.</i> Сохраните кроссворд.<br>
                        <i>Шаг 5.</i> Получите ссылку, по которой ваши друзья смогут открыть этот кроссворд для разгадывания.<br>
                        <i>Шаг 6.</i> Следите за статистикой.</p>
                </div>
                <div class="save">
                    <p>Введите id под которым будет сохранен ваш кроссворд</p>
                    <input type="text" placeholder="id">
                    <button>Сохранить</button>
                </div>
            </div>
        </main>
        `
    },

    renderTable: () => {
        let markup = ``;
        for(let i = 0; i < Constructor.lenTR; i++) {
            markup += Constructor.renderTR(i);
        }
        return markup;
    },

    renderTR: (i) => {
        let markup = ``;
        for(let j = 0; j < Constructor.lenTD; j++) {
            markup += Constructor.renderTD(i, j);
        }
        return `
        <tr>${markup}</tr>
        `
    },

    renderTD: (i, j) => {
        return `
        <td id="${i}-${j}" onclick="event.target.classList.add('selected')">&nbsp;</td>
        `
    },

    renderDef: (len) => {
        let markup = `
            <p class="my-word">Ваше слово:</p>
            <table class="word">
                <tr>
                    ${Constructor.renderTDDif().repeat(len)}
                </tr>
            </table>
            <p class="my-question">Ваш вопрос:</p>
            <textarea class="question"></textarea>
            <div class="buttons-word">
                <button class="save-word">Сохранить</button>
                <button class="delete-word">Удалить</button>
            </div>
        `
        return markup;
    },

    renderTDDif: () => {
        return `
        <td>&nbsp;</td>
        `
    },

    lenTD: 10,  //
    lenTR: 10,  //строки
    isNoTouch: true,
    selectedTD: [],

    afterRender: async () => {
        const btnUp = document.querySelector('.up');
        const btnDown = document.querySelector('.down');
        const btnLeft = document.querySelector('.left');
        const btnRight = document.querySelector('.right');
        const tbody = document.querySelector('tbody');

        btnUp.addEventListener('click', e => {
            if(Constructor.lenTR > 7) {
                let flag = true;
                const row = tbody.lastElementChild;
                for(let i=0; i< row.children.length; i++) {
                    if(row.children[i].getAttribute('class') == 'selected') {
                        flag = false;
                    }
                }
                if(flag) {
                    Constructor.lenTR -= 1;
                    tbody.removeChild(row);
                }
                flag = true;
                
            }
        });

        btnDown.addEventListener('click', e => {
            if(Constructor.lenTR < 15) {
                Constructor.lenTR += 1;
                const toAppend = document.createElement('tr');
                toAppend.innerHTML = Constructor.renderTR(Constructor.lenTR - 1);
                tbody.appendChild(toAppend);
            }
        });

        btnLeft.addEventListener('click', e => {
            if(Constructor.lenTD > 7) {
                let rows = document.querySelectorAll('.crossword-table tr');
                let flag = true;
                rows.forEach(r => {
                    if(r.lastElementChild.getAttribute('class') == 'selected') {
                        flag = false;
                    }
                });
                if(flag) {
                    Constructor.lenTD -= 1;
                    rows.forEach(r => r.removeChild(r.lastElementChild));
                }
                flag = true;
            }
        });

        btnRight.addEventListener('click', e => {
            if(Constructor.lenTD < 15) {
                Constructor.lenTD += 1;
                let rows = document.querySelectorAll('.crossword-table tr');
                let i = 0;
                rows.forEach(r => {
                    const toAppend = document.createElement('td');
                    toAppend.innerHTML = '&nbsp;';
                    toAppend.id = i + "-" + (Constructor.lenTD - 1);
                    toAppend.setAttribute("onclick", "event.target.classList.add('selected')");
                    i++;
                    r.appendChild(toAppend);
                });
            }
        });

        tbody.addEventListener('click', e => {
            Constructor.isNoTouch = false;
            if(!Constructor.isNoTouch) {
                const toSelect = e.target.id.split('-').map(e => Number(e));
                if(Constructor.selectedTD < 2) {
                    Constructor.selectedTD.push(toSelect);
                } else if (toSelect[0] == Constructor.selectedTD[0][0] && (toSelect[1] == Constructor.selectedTD[0][1] - 1
                    || toSelect[1] == Constructor.selectedTD[Constructor.selectedTD.length - 1][1] + 1)) {
                        Constructor.selectedTD.push(toSelect);
                        Constructor.selectedTD.sort((a, b) => a[1] > b[1] ? 1 : -1);
                } else if(toSelect[1] == Constructor.selectedTD[0][1] && (toSelect[0] == Constructor.selectedTD[0][0] - 1
                        || toSelect[0] == Constructor.selectedTD[Constructor.selectedTD.length - 1][0] + 1)) {
                        Constructor.selectedTD.push(toSelect);
                        Constructor.selectedTD.sort((a, b) => a[0] > b[0] ? 1 : -1);
                } else {
                    Constructor.selectedTD.splice(Constructor.selectedTD.indexOf(toSelect), 1);
                    document.getElementById(e.target.id).classList.remove('selected');
                }
                console.log(Constructor.selectedTD);

                const instr = document.getElementById('instructions');
                let def = document.createElement('div');
                def.setAttribute('class', "definition");
                def.setAttribute('id', "definition");
                def.innerHTML = Constructor.renderDef(Constructor.selectedTD.length);
                
                if(instr && Constructor.selectedTD.length) {
                    document.getElementById('instructions').replaceWith(def);
                } else if(!Constructor.selectedTD.length) {
                    document.getElementById('definition').hidden = true;
                } else {
                    document.getElementById('definition').replaceWith(def);
                }
            }
        });
    }
};

export default Constructor;