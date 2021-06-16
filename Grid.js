"use strict"

export default class Grid {
    constructor(id, structure, url) {
        this.id = id;
        this.tblBody;
        this.info;
        this.url = url;
        this.columns = structure.columns;
        this.renderer = structure.renderer;
        this.dataSource = structure.dataSource;
        this.table = document.getElementById(id);
        if (url) {
            this.getInformation(url);
        }
        this.createTable();
        this.createFilter();
        this.createButton();
    }

    async getInformation(url) {
        let response = await fetch(url);
        let dataInfo = await response.json();
        this.dataSource = dataInfo.results;
        this.info = dataInfo.info;
        this.redraw()
    }

    next() {
            this.getInformation(this.info.next)
                .catch(error => console.log(error))
    }

    prev() {
        this.getInformation(this.info.prev)
            .catch(error => console.log(error))
    }

    createButton() {
        let btn = document.createElement("BUTTON");
        btn.innerHTML = "Вперед";
        btn.id = 'Next';
        document.body.appendChild(btn)
        btn.addEventListener('click', () => {
            this.next()
        });

        let btn2 = document.createElement("BUTTON");
        btn2.innerHTML = "Назад";
        btn2.id = 'Prev';
        document.body.appendChild(btn2)
        btn2.addEventListener('click', () => {
            this.prev()
        })
    }

    redraw(data) {
        data ? this.render(data) :
            this.render(this.dataSource);
    }

    filter(columnName, value) {
        let url = `https://rickandmortyapi.com/api/character/?name=${value}`
        this.getInformation(url)
            .catch(error => console.log(error))
    }

    createFilter() {
        let input = document.createElement("input");
        input.type = "text";
        input.id = 'filterText';
        input.innerHTML = 'Фильтр';
        document.body.appendChild(input)

        let buttonFilter = document.createElement("button");
        buttonFilter.innerHTML = "Фильтр"
        buttonFilter.id = 'buttonFilter'
        document.body.appendChild(buttonFilter)
        buttonFilter.addEventListener('click', () => {
            this.filter('name', input.value)
        })
    }

    createTable() {
        this.tblBody = document.createElement("tbody");
        let tr = document.createElement('tr');
        for (let col of this.columns) {
            let th = document.createElement('th');
            let text = document.createTextNode(col.title);
            th.style.width = col.size;
            th.appendChild(text);
            tr.appendChild(th);
        }
        this.table.appendChild(tr);
        this.table.appendChild(this.tblBody);
    }

    render(data) {
        this.removeRows(this.tblBody);
        if (data !== undefined) {
            for (let i = 0; i < data.length; i++) {
                let tableRow = data[i];
                let tr = document.createElement('tr');
                for (let col of this.columns) {
                    this.renderer(i, tableRow, col.columnName, tr)
                }
                tr.dataset.id = tableRow.id
                this.tblBody.appendChild(tr);
            }
        }
    }

    removeRows(tbody) {
        while (tbody.rows[0]) {
            tbody.deleteRow(0);
        }
    }
}
