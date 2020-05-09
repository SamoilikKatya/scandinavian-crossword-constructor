let Constructor = {
    render: async () => {
        return `
        <div class="content">
                <div class="crossword">
                    <div class="crossword-up">
                        <div class="crossword-table">
                            <table>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Т</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Т</td>
                                    <td>Е</td>
                                    <td>С</td>
                                    <td>Т</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>С</td>
                                    <td></td>
                                    <td>Е</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Т</td>
                                    <td></td>
                                    <td>С</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Т</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
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
                <div class="instructions">
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

    afterRender: async () => {

    }
};

export default Constructor;