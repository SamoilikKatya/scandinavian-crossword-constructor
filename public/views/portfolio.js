let Portfolio = {
    render: (all) => {
        return `
        <div class="crossword-list">${Portfolio.listItems(all)}</div>
        `
    },

    listItems: (all) => {
        let markup= ``;
        for(let i in all[0]) {
            let sum = all[0][i].procents ? all[0][i].procents.reduce(function(sum, current) {
                return sum + current;
              }, 0) : 0;
            let length = all[0][i].procents ? all[0][i].procents.length : 0;
            markup += Portfolio.renderItem(i, all[0][i].views, sum == 0 ? sum : (sum / length).toFixed(3));
        }
        return markup;
    },

    renderItem: (title, views, procents) => {
        return `
        <div class="crossword-item">
            <div class="item-title">
                <h3>${title}</h3>
                <img src="img/watch-crossword.png">
            </div>
            <p class="views">Количество решений</p>
            <p class="amount-views">${views}</p>
            <p class="procent">Процент выполнения</p>
            <p class="amount-procent">${procents}</p>
        </div>
        `
    },

    afterRender: async () => {

    }
};

export default Portfolio;