var Employee = [];
$(document).ready(function () {
    table = $('#Replacement').dataTable({
        "ajax": {
            url: "/Replacement/LoadReplacement",
            type: "GET",
            dataType: "json",
            dataSrc: "",
        },
        "columnDefs": [
            { "orderable": false, "targets": 4 },
            { "searchable": false, "targets": 4 }
        ],
        "columns": [
            { "data": "employeeName" },
            { "data": "replacementReason" },
            { "data": "detail" },
            {
                "data": "confirmation", "render": function (data) {
                    if (data == true) {
                        return "Accepted";
                    } else if (data == false){
                        return "Rejected";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return " <td><button type='button' class='btn btn-warning' id='BtnEdit' onclick=GetById('" + row.id + "');>Edit</button> <button type='button' class='btn btn-danger' id='BtnDelete' onclick=Delete('" + row.id + "');>Delete</button> <button type='button' class='btn btn-info' id='BtnConfirm' onclick=Confirm('" + row.id + "');>Confirm</button ></td >";
                }
            },
        ]
    });
    LoadEmployee($('#EmployeeOption'));
}); //load table Replacement
/*--------------------------------------------------------------------------------------------------*/
function LoadEmployee(element) {
    if (Employee.length === 0) {
        $.ajax({
            type: "Get",
            url: "/Employee/LoadEmployee",
            success: function (data) {
                Employee = data.data;
                renderEmployee(element);
            }
        });
    }
    else {
        renderEmployee(element);
    }
} //load Employee
function renderEmployee(element) {
    var $option = $(element);
    $option.empty();
    $option.append($('<option/>').val('0').text('Select Employee').hide());
    $.each(Employee, function (i, val) {
        $option.append($('<option/>').val(val.id).text(val.firstName));
    });
} // Memasukan LoadEmployee ke dropdown
/*--------------------------------------------------------------------------------------------------*/
document.getElementById("BtnAdd").addEventListener("click", function () {
    clearscreen();
    $('#SaveBtn').show();
    $('#UpdateBtn').hide();
    LoadEmployee($('#EmployeeOption'));
    $('#divemail').show();
    $('#divpass').show();
}); //fungsi btn add
/*--------------------------------------------------------------------------------------------------*/
function clearscreen() {
    $('#Id').val('');
    $('#EmployeeOption').val('');
    $('#ReplacementReason').val('');
    $('#Detail').val('');
    $('#myModal').modal('hide');
    LoadEmployee($('#EmployeeOption'));
} //clear field
/*--------------------------------------------------------------------------------------------------*/
function GetById(Id) {
    debugger;
    $.ajax({
        url: "/Replacement/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            $('#Id').val(result.id);
            $('#EmployeeOption').val(result.employeeId);
            $('#ReplacementReason').val(result.replacementReason);
            $('#Detail').val(result.detail);
            $('#myModal').modal('show');
            $('#UpdateBtn').show();
            $('#SaveBtn').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responsText);
        }
    })
} //get id to edit
/*--------------------------------------------------------------------------------------------------*/
function Save() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Replacement').DataTable({
        "ajax": {
            url: "/Replacement/LoadReplacement"
        }
    });
    var Replacement = new Object();
    Replacement.employeeId = $('#EmployeeOption').val();
    Replacement.replacementReason = $('#ReplacementReason').val();
    Replacement.detail = $('#Detail').val();
    $.ajax({
        type: 'POST',
        url: '/Replacement/InsertOrUpdate',
        data: Replacement
    }).then((result) => {
        if (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 204) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Replacement Add Successfully',
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
    var table = $('#Replacement').DataTable({
        "ajax": {
            url: "/Replacement/LoadReplacement"
        }
    });
    var Replacement = new Object();
    Replacement.id = $('#Id').val();
    Replacement.employeeId = $('#EmployeeOption').val();
    Replacement.replacementReason = $('#ReplacementReason').val();
    Replacement.detail = $('#Detail').val();
    $.ajax({
        type: 'POST',
        url: '/Replacement/InsertOrUpdate',
        data: Replacement
    }).then((result) => {
        debugger;
        if (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 204) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Replacement Update Successfully',
                timer: 2500
            }).then(function () {
                table.ajax.reload();
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
    var table = $('#Replacement').DataTable({
        "ajax": {
            url: "/Replacement/LoadReplacement"
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
                url: "/Replacement/Delete/",
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
                        $('#Replacement').modal('hide');
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
/*--------------------------------------------------------------------------------------------------*/
function Confirm(Id) {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Replacement').DataTable({
        "ajax": {
            url: "/Replacement/LoadReplacement"
        }
    });
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You will confirm this Request",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Accept',
        cancelButtonText: 'No, Reject',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "/Replacement/Confirm1/",
                data: { Id: Id }
            }).then((result) => {
                debugger;
                if (result.statusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Accept Successfully',
                        timer: 2000
                    }).then(function () {
                        table.ajax.reload();
                        cls();
                        $('#Replacement').modal('hide');
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
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            $.ajax({
                url: "/Replacement/Confirm0/",
                data: { Id: Id }
            }).then((result) => {
                debugger;
                if (result.statusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Reject Successfully',
                        timer: 2000
                    }).then(function () {
                        table.ajax.reload();
                        cls();
                        $('#Replacement').modal('hide');
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
    })
} //function delete