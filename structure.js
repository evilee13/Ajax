export let structure = {
    dataSource: [],
    columns: [
        {
            title: "NAME",
            columnName: "name",
            size: "150px",
        },
        {
            title: "STATUS",
            columnName: "status",
            size: "150px",
        },
        {
            title: "TYPE",
            columnName: "type",
            size: "150px",
        },
        {
            title: "GENDER",
            columnName: "gender",
            size: "150px",
        },
        {
            title: "ORIGINAL NAME",
            columnName: "originName",
            size: "150px",
        },
    ],
    renderer: function (index, row, columnName, tr) {
        let td = document.createElement('td');
        if (columnName === 'originName') {
            td.innerHTML = row.origin.name;
        } else {
            td.innerHTML = row[columnName];
        }
        tr.appendChild(td)
    },
}


