var datenow = new Date();
var Company = [];
$(document).ready(function () {
    table = $('#Interview').dataTable({
        "ajax": {
            url: "/Interview/LoadInterview",
            type: "GET",
            dataType: "json",
            dataSrc: ""
        },
        "columnDefs": [
            { "orderable": false, "targets": 10 },
            { "searchable": false, "targets": 10 }
        ],
        "columns": [
            { "data": "title" },
            { "data": "companyName" },
            { "data": "division" },
            { "data": "jobDesk" },
            { "data": "address" },
            { "data": "gender" },
            { "data": "experience" },
            { "data": "education" },
            { "data": "descriptionAddress" },
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
    LoadCompany($('#CompanyOption'));
}); //load table Interview
/*--------------------------------------------------------------------------------------------------*/
function LoadCompany(element) {
    if (Company.length === 0) {
        $.ajax({
            type: "Get",
            url: "/Company/LoadCompany",
            success: function (data) {
                Company = data.data;
                renderCompany(element);
            }
        });
    }
    else {
        renderCompany(element);
    }
} //load company
function renderCompany(element) {
    var $option = $(element);
    $option.empty();
    $option.append($('<option/>').val('0').text('Select Company').hide());
    $.each(Company, function (i, val) {
        $option.append($('<option/>').val(val.id).text(val.name));
    });
} // Memasukan LoadCompany ke dropdown
/*--------------------------------------------------------------------------------------------------*/
document.getElementById("BtnAdd").addEventListener("click", function () {
    clearscreen();
    $('#SaveBtn').show();
    $('#UpdateBtn').hide();
    LoadCompany($('#CompanyOption'));
    $('#divemail').show();
    $('#divpass').show();
}); //fungsi btn add
/*--------------------------------------------------------------------------------------------------*/
function clearscreen() {
    $('#Id').val('');
    $('#Title').val('');
    $('#CompanyOption').val('');
    $('#Division').val('');
    $('#Gender').val('');
    $('#Address').val('');
    $('#JobDesk').val('');
    $('#Experience').val('');
    $('#Education').val('');
    $('#DescriptionAddress').val('');
    $('#InterviewDate').val('');
    LoadCompany($('#CompanyOption'));
} //clear field
/*--------------------------------------------------------------------------------------------------*/
function GetById(Id) {
    debugger;
    $.ajax({
        url: "/Interview/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            $('#Id').val(result.id);
            $('#Title').val(result.title);
            $('#CompanyOption').val(result.companyId);
            $('#Division').val(result.division);
            $('#Gender').val(result.gender);
            $('#Address').val(result.address);
            $('#JobDesk').val(result.jobDesk);
            $('#Experience').val(result.experience);
            $('#Education').val(result.education);
            $('#DescriptionAddress').val(result.descriptionAddress);
            $('#InterviewDate').val(moment(result.interviewDate).format('YYYY-MM-DD'));
            $('#myModal').modal('show');
            $('#UpdateBtn').show();
            $('#SaveBtn').hide();
            //$('#divemail').hide();
            //$('#divpass').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responsText);
        }
    })
} //get id to edit
/*--------------------------------------------------------------------------------------------------*/
function Save() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Interview/LoadInterview"
        }
    });
    var Interview = new Object();
    Interview.title = $('#Title').val();
    Interview.companyId = $('#CompanyOption').val();
    Interview.division = $('#Division').val();
    Interview.jobDesk = $('#JobDesk').val();
    Interview.address = $('#Address').val();
    Interview.gender = $('#Gender').val();
    Interview.experience = $('#Experience').val();
    Interview.education = $('#Education').val();
    Interview.descriptionAddress = $('#DescriptionAddress').val();
    Interview.interviewDate = $('#InterviewDate').val();
    $.ajax({
        type: 'POST',
        url: '/Interview/InsertOrUpdate',
        data: Interview
    }).then((result) => {
        if (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 204) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Interview Add Successfully',
                timer: 2500
            }).then(function () {
                table.ajax.reload();
                $('#myModal').modal('hide');
                clearscreen();
            });
        }
        else {
            Swal.fire('Error', 'Failed to Input', 'error');
        }
    })
} //function save
/*--------------------------------------------------------------------------------------------------*/
function Edit() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Interview/LoadInterview"
        }
    });
    var Interview = new Object();
    Interview.id = $('#Id').val();
    Interview.title = $('#Title').val();
    Interview.companyId = $('#CompanyOption').val();
    Interview.division = $('#Division').val();
    Interview.jobDesk = $('#JobDesk').val();
    Interview.address = $('#Address').val();
    Interview.gender = $('#Gender').val();
    Interview.experience = $('#Experience').val();
    Interview.education = $('#Education').val();
    Interview.descriptionAddress = $('#DescriptionAddress').val();
    Interview.interviewDate = $('#InterviewDate').val();
    $.ajax({
        type: 'POST',
        url: '/Interview/InsertOrUpdate',
        data: Interview
    }).then((result) => {
        debugger;
        if (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 204) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Interview Update Successfully',
                timer: 2500
            }).then(function () {
                table.ajax.reload();
                $('#Interview').modal('hide');
                clearscreen();
            });
        } else {
            Swal.fire('Error', 'Failed to Edit', 'error');
        }
    })
}//function edit
/*--------------------------------------------------------------------------------------------------*/
function Delete(Id) {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Interview/LoadInterview"
        }
    });
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.value) {
            //debugger;
            $.ajax({
                url: "/Interview/Delete/",
                data: { Id: Id }
            }).then((result) => {
                debugger;
                if (result.statusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Delete Successfully',
                        timer: 2000
                    }).then(function () {
                        table.ajax.reload();
                        cls();
                        $('#Interview').modal('hide');
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: 'Failed to Delete',
                    })
                    ClearScreen();
                }
            })
        }
    });
} //function delete
