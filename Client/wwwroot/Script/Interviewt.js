var datenow = new Date();
$(document).ready(function () {
    debugger;
    table = $('#Interview').dataTable({
        "ajax": {
            url: "/Interview/LoadInterview",
            type: "GET",
            dataType: "json",
            dataSrc: ""
        },
        "columnDefs": [
            { "orderable": false, "targets": 7 },
            { "searchable": false, "targets": 7 }
        ],
        "columns": [
            { "data": "title" },
            { "data": "companyName" },
            { "data": "division" },
            { "data": "jobDesk" },
            { "data": "address" },
            { "data": "description" },
            {
                "data": "interviewDate", "render": function (data) {
                    return moment(data).format('DD/MM/YYYY, h:mm a');
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return " <td><button type='button' class='btn btn-warning' id='BtnEdit' onclick=GetById('" + row.id + "');>Edit</button> <button type='button' class='btn btn-danger' id='BtnDelete' onclick=Delete('" + row.id + "');>Delete</button ></td >";
                }
            },
        ]
    });
}); //load table Interview