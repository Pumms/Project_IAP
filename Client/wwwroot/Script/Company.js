﻿$(document).ready(function () {
    //debugger;
    $('#Company').dataTable({
        "ajax": {
            url: "/Company/LoadCompany",
            type: "GET",
            dataType: "json"
        },
        "columnDefs": [
            { "orderable": false, "targets": 4 },
            { "searchable": false, "targets": 4 }
        ],
        "columns": [
            { data: "name" },
            { data: "address" },
            { data: "phoneNumber" },
            { data: "email" },
            {
                data: null, render: function (data, type, row) {
                    return "<td><button type='button' class='btn btn-warning mb-1' id='BtnEdit' data-toggle='tooltip' data-placement='top' title='Edit' onclick=GetById('" + row.id + "');><i class='mdi mdi-pencil'></i></button> <button type='button' class='btn btn-danger' id='BtnDelete' data-toggle='tooltip' data-placement='top' title='Delete' onclick=Delete('" + row.id + "');><i class='mdi mdi-delete'></i></button></td>";
                }
            },
        ]
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}); //load table Company
/*--------------------------------------------------------------------------------------------------*/
function GetById(id) {
    debugger;
    $.ajax({
        url: "/Company/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $('#Id').val(result.id);
            $('#Name').val(result.name);
            $('#Address').val(result.address);
            $('#PhoneNumber').val(result.phoneNumber);
            $('#Email').val(result.email);
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
    var table = $('#Company').DataTable({
        "ajax": {
            url: "/Company/LoadCompany"
        }
    });
    var Company = new Object();
    Company.Name = $('#Name').val();
    Company.Address = $('#Address').val();
    Company.PhoneNumber = $('#PhoneNumber').val();
    Company.Email = $('#Email').val();
    if ($('#Name').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Name Cannot be Empty',
        })
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: '/Company/InsertOrUpdate',
            data: Company,
        }).then((result) => {
            if (result.statusCode == 200) {
                Swal.fire({
                    icon: 'success',
                    potition: 'center',
                    title: 'Company Add Successfully',
                    timer: 2500
                }).then(function () {
                    table.ajax.reload();
                    cls();
                    $('#myModal').modal('hide');
                });
            }
            else {
                Swal.fire('Error', 'Failed to Input', 'error');
            }
        })
    }
} //function save
/*--------------------------------------------------------------------------------------------------*/
function Edit() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Company').DataTable({
        "ajax": {
            url: "/Company/LoadCompany"
        }
    });
    var Company = new Object();
    Company.Id = $('#Id').val();
    Company.Name = $('#Name').val();
    Company.Address = $('#Address').val();
    Company.PhoneNumber = $('#PhoneNumber').val();
    Company.Email = $('#Email').val();
    $.ajax({
        type: 'POST',
        url: '/Company/InsertOrUpdate',
        data: Company
    }).then((result) => {
        debugger;
        //if (result.statusCode == 200) {
        if (isStatusCodeSuccess = true) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Company Update Successfully',
                timer: 2500
            }).then(function () {
                table.ajax.reload();
                cls();
                $('#myModal').modal('hide');
            });
        } else {
            Swal.fire('Error', 'Failed to Edit', 'error');
        }
    })
}//function edit
/*--------------------------------------------------------------------------------------------------*/
function Delete(Id) {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Company').DataTable({
        "ajax": {
            url: "/Company/LoadCompany"
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
                url: "/Company/Delete/",
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
                        $('#myModal').modal('hide');
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
document.getElementById("BtnAdd").addEventListener("click", function () {
    $('#Id').val('');
    $('#Name').val('');
    $('#Address').val('');
    $('#PhoneNumber').val('');
    $('#Email').val('');
    $('#SaveBtn').show();
    $('#UpdateBtn').hide();
}); //fungsi btn add
/*--------------------------------------------------------------------------------------------------*/
function cls() {
    $('#Id').val('');
    $('#Name').val('');
    $('#Address').val('');
    $('#PhoneNumber').val('');
    $('#Email').val('');
} //Clear field