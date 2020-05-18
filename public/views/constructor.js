let Constructor = {
    render: async (user) => {
        Constructor.lenTR = 10;
        Constructor.lenTD = 10;
        Constructor.user = user;
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
        let markup = ``;
        Constructor.selectedTD.forEach(el => {
            markup += el.value == '&nbsp;' ? Constructor.renderTDDifVal() : Constructor.renderTDDif(el.value);
        });
        return `
        <p class="my-word">Ваше слово:</p>
        <table class="word">
            <tr id="my-tr">
                ${markup}
            </tr>
        </table>
        <p class="my-question">Ваш вопрос:</p>
        <textarea class="question"></textarea>
        <div class="buttons-word">
            <button class="save-word">Сохранить</button>
            <button class="delete-word">Отменить</button>
        </div>
    `;
    },

    renderTDDif: (a) => {
        return `
        <td><input type="text" maxlength="1" value="${a.toUpperCase()}" readonly></td>
        `
    },

    renderTDDifVal: () => {
        return `
        <td><input type="text" maxlength="1" onkeyup="this.value = this.value.toUpperCase();"></td>
        `
    },

    lenTD: 10,  //
    lenTR: 10,  //строки
    isNoTouch: true,
    selectedTD: [],
    wordQuestion: [],
    isVertical: false,
    user: null,
    currentAnswer: [],

    afterRender: async () => {
        const btnUp = document.querySelector('.up');
        const btnDown = document.querySelector('.down');
        const btnLeft = document.querySelector('.left');
        const btnRight = document.querySelector('.right');
        const tbody = document.querySelector('tbody');
        const btnCrosswSave = document.querySelector('.save button');

        btnUp.addEventListener('click', e => {
            if(Constructor.lenTR > 7) {
                let isCanEdit = true;
                const row = tbody.lastElementChild;
                for(let i=0; i< row.children.length; i++) {
                    if(row.children[i].getAttribute('class') == 'selected') {
                        isCanEdit = false;
                    }
                }
                if(isCanEdit) {
                    Constructor.lenTR -= 1;
                    tbody.removeChild(row);
                }
                isCanEdit = true;
                
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
                let isCanEdit = true;
                rows.forEach(r => {
                    if(r.lastElementChild.getAttribute('class') == 'selected') {
                        isCanEdit = false;
                    }
                });
                if(isCanEdit) {
                    Constructor.lenTD -= 1;
                    rows.forEach(r => r.removeChild(r.lastElementChild));
                }
                isCanEdit = true;
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
                    toAppend.addEventListener("click", event => event.target.classList.add('selected'));
                    i++;
                    r.appendChild(toAppend);
                });
            }
        });

        tbody.addEventListener('click', e => {
            Constructor.isNoTouch = false;
            if(!Constructor.isNoTouch) {
                let index = -1;
                const toSelect = e.target.id.split('-').map(e => Number(e));
                if(toSelect.length == 2) {
                    if(Constructor.selectedTD.length == 0) {
                        Constructor.selectedTD.push({toSelect: toSelect, value: e.target.innerHTML});
                    } else if (Constructor.selectedTD.length == 1 && toSelect[0] == Constructor.selectedTD[0].toSelect[0] &&
                        (toSelect[1] == Constructor.selectedTD[0].toSelect[1] - 1 || toSelect[1] == Constructor.selectedTD[0].toSelect[1] + 1)) {
                            Constructor.isVertical = false;
                            Constructor.selectedTD.push({toSelect: toSelect, value: e.target.innerHTML});
                            Constructor.selectedTD.sort((a, b) => a.toSelect[1] > b.toSelect[1] ? 1 : -1);
                    } else if (Constructor.selectedTD.length == 1 && toSelect[1] == Constructor.selectedTD[0].toSelect[1] &&
                        (toSelect[0] == Constructor.selectedTD[0].toSelect[0] - 1 || toSelect[0] == Constructor.selectedTD[0].toSelect[0] + 1)) {
                            Constructor.isVertical = true;
                            Constructor.selectedTD.push({toSelect: toSelect, value: e.target.innerHTML});
                            Constructor.selectedTD.sort((a, b) => a.toSelect[0] > b.toSelect[0] ? 1 : -1);
                    } else if(!Constructor.isVertical && toSelect[0] == Constructor.selectedTD[0].toSelect[0] &&
                        (toSelect[1] == Constructor.selectedTD[0].toSelect[1] - 1 ||
                        toSelect[1] == Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[1] + 1)) {
                                Constructor.selectedTD.push({toSelect: toSelect, value: e.target.innerHTML});
                                Constructor.selectedTD.sort((a, b) => a.toSelect[1] > b.toSelect[1] ? 1 : -1);
                    } else if(Constructor.isVertical && toSelect[1] == Constructor.selectedTD[0].toSelect[1] &&
                        (toSelect[0] == Constructor.selectedTD[0].toSelect[0] - 1 ||
                        toSelect[0] == Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[0] + 1)) {
                                Constructor.selectedTD.push({toSelect: toSelect, value: e.target.innerHTML});
                                Constructor.selectedTD.sort((a, b) => a.toSelect[0] > b.toSelect[0] ? 1 : -1);
                    } else if((toSelect[0] == Constructor.selectedTD[0].toSelect[0] && toSelect[1] == Constructor.selectedTD[0].toSelect[1]) ||
                        (toSelect[0] == Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[0] &&
                        toSelect[1] == Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[1])) {
                            
                            for(let i in Constructor.selectedTD) {
                                if(Constructor.selectedTD[i].toSelect[0] == toSelect[0] &&
                                    Constructor.selectedTD[i].toSelect[1] == toSelect[1]) {
                                        index = i;
                                        break;
                                    }
                            }
                            Constructor.selectedTD.splice(index, 1);
                            console.log(Constructor.selectedTD);
                            document.getElementById(e.target.id).classList.remove('selected');
                    } else {
                        Constructor.selectedTD.forEach(el => {
                            document.getElementById(el.toSelect[0] + '-' + el.toSelect[1]).classList.remove('selected');
                        });
                        Constructor.selectedTD = [];
                        Constructor.selectedTD.push({toSelect: toSelect, value: e.target.innerHTML});
                    }
                }
                

                if(Constructor.selectedTD.length > 1) {
                    Constructor.selectedTD.forEach(el => {
                        document.getElementById(el.toSelect[0] + '-' + el.toSelect[1]).classList.add('selected');
                    });
                }
                const instr = document.getElementById('instructions');
                let def = document.createElement('div');
                def.setAttribute('class', "definition");
                def.setAttribute('id', "definition");
                def.innerHTML = Constructor.renderDef(Constructor.selectedTD.length);
                
                if(instr && Constructor.selectedTD.length == 1) {
                    document.getElementById('instructions').replaceWith(def);
                    Constructor.listenersForWord();
                } else if(Constructor.selectedTD.length == 1) {
                    document.getElementById('definition').replaceWith(def);
                    Constructor.listenersForWord();
                } else if(!Constructor.selectedTD.length) {
                    document.getElementById('definition').hidden = true;
                } else if(Constructor.selectedTD.length > 1) {
                    if(index == -1) {
                        let newTD = document.createElement('td');
                        let newInput = document.createElement('input');
                        newInput.setAttribute('maxlength', '1');
                        newInput.setAttribute('type', 'text');
                        newTD.appendChild(newInput);
                        if(toSelect[0] == Constructor.selectedTD[0].toSelect[0] &&
                            toSelect[1] == Constructor.selectedTD[0].toSelect[1]) {
                                document.getElementById('my-tr').insertBefore(newTD, document.getElementById('my-tr').childNodes[1]);
                        } else if(toSelect[0] == Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[0] &&
                            toSelect[1] == Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[1]) {
                            document.getElementById('my-tr').appendChild(newTD);
                        }
                    } else if (index == 0) {
                        document.getElementById('my-tr').removeChild(document.getElementById('my-tr').childNodes[1])
                    } else {
                        document.getElementById('my-tr').removeChild(document.getElementById('my-tr').lastChild)
                    }
                }
            }
        });

        btnCrosswSave.addEventListener('click', e => {
            let id = document.querySelector('.save input').value;
            if(id && id != 0) {
                if(Constructor.wordQuestion.length) {
                    for(let i=0; i < Constructor.lenTR; i++) {
                        let row = [];
                        for(let j = 0; j < Constructor.lenTD; j++) {
                            let currentID = i + "-" + j;
                            let currentLetter = document.getElementById(currentID).innerHTML;
                            row.push(currentLetter == '&nbsp;' ? 0 : currentLetter);
                        }
                        Constructor.currentAnswer.push(row);
                    }
                    const allID = [];
                    db.ref('crosswords/' + id).on('value', function(snapshot) {
                        allID.push(snapshot.val());
                        if(allID[0] == null) {
                            let tempArr = [];
                            tempArr.push( Constructor.currentAnswer);
                            db.ref('crosswords/' + id).set({
                                words: Constructor.wordQuestion,
                                lenTD: Constructor.lenTD,
                                lenTR: Constructor.lenTR,
                                views: 0,
                                procents: [1313],
                                author: Constructor.user,
                                answers: tempArr
                            });
                            location.reload();
                            //window.location.hash = '/portf';
                        } else {
                            alert("Кроссворд с таким id уже существует!");
                        }
                    });
                } else {
                    alert("Кроссворд не может быть пустым!");
                }
            } else {
                alert("Недопустимый id!!");
            }
        })

        
    },

    listenersForWord: () => {
        const btnSaveWord = document.querySelector('.save-word');
        const btnDeleteWord = document.querySelector('.delete-word');
        const wordTR = document.querySelector('.word tr');

        btnSaveWord.addEventListener('click', e => {   
    
            let word = '';
            document.querySelectorAll('.word input').forEach(el => word += el.value);
            let question = document.querySelector('.question').value;
            let isVertical = Constructor.selectedTD[0].toSelect[0] != Constructor.selectedTD[Constructor.selectedTD.length - 1].toSelect[0];
            if (word.length == Constructor.selectedTD.length) {
                let i = 0;
                Constructor.selectedTD.forEach(el => {
                    document.getElementById(el.toSelect[0] + '-' + el.toSelect[1]).classList.remove('selected');
                    document.getElementById(el.toSelect[0] + '-' + el.toSelect[1]).innerHTML = word[i];
                    i++;
                });
                document.getElementById('definition').hidden = true;
                let deleteFlag = false, isSmaller = false;
                let elemToDel = {};
                Constructor.wordQuestion.forEach(el => {
                    if(el.firstLetter[0] == Constructor.selectedTD[0].toSelect[0] &&el.firstLetter[1] == Constructor.selectedTD[0].toSelect[1]
                         && el.isVertical == isVertical) {
                        deleteFlag = true;
                        elemToDel = el;
                        if (el.word.length > Constructor.selectedTD.length) {
                            isSmaller = true;
                        }
                    }
                });
                if(!isSmaller) {
                    if(deleteFlag) {
                        Constructor.wordQuestion.splice(Constructor.wordQuestion.indexOf(elemToDel), 1);
                    }
                    Constructor.wordQuestion.push({word: word, question: question, firstLetter: Constructor.selectedTD[0].toSelect,
                        isVertical: isVertical});
                    
                } else {
                    alert('Вопрос для данного слова уже определен!');
                }
                Constructor.selectedTD = [];
            }
        });
        
        btnDeleteWord.addEventListener('click', e => {
            Constructor.selectedTD.forEach(el => {
                document.getElementById(el.toSelect[0] + '-' + el.toSelect[1]).classList.remove('selected');
            });
            document.getElementById('definition').hidden = true;
            Constructor.selectedTD = [];
        });
    }
};

export default Constructor;