"use strict"

export default class Grid {
    constructor(id, structure, url) {
        if (url) {
            this.getInformation(url);
        }
        this.id = id;
        this.tblBody;
        this.columns = structure.columns;
        this.renderer = structure.renderer;
        this.dataSource = structure.dataSource;
        this.table = document.getElementById(id);
        this.createTable();
        this.createFilter();
    }

    async getInformation(url) {
        let response = await fetch(url);
        let dataInfo = await response.json();
        this.dataSource = dataInfo.results
        this.redraw()
    }

    redraw(data) {
        data ? this.render(data) :
            this.render(this.dataSource);
    }

    filter(columnName, value) {
        return this.dataSource.filter(item => {
            return item[columnName] === value;
        })
    }

    createFilter() {
        let input = document.createElement("input");
        input.type = "text";
        input.id = 'filterText';
        input.innerHTML = 'Фильтр';
        document.body.appendChild(input)

        let buttonFilter = document.createElement("button");
        buttonFilter.innerHTML = "Filter"
        buttonFilter.id = 'buttonFilter'
        document.body.appendChild(buttonFilter)
        buttonFilter.addEventListener('click', () => {
            this.filterParams = {column: "genre", value: input.value.toLowerCase()}
            this.redraw(this.filter('genre', input.value.toLowerCase()))
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
        if (this.filterParams) {
            data = this.filter(this.filterParams.column, this.filterParams.value)
        }
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

    removeRows(tbody) {
        while (tbody.rows[0]) {
            tbody.deleteRow(0);
        }
    }
}




// let url = 'https://rickandmortyapi.com/api/character'
// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data))

// data.results.forEach((item) => {
//     console.log(item.name+item.status+item.type+item.gender+item.origin.name)
// })