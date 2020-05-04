$(document).ready(function () {
    debugger;
    table = $('#BootCamp').dataTable({
        "ajax": {
            url: "/BootCamp/LoadBootCamp",
            type: "GET",
            dataType: "json"
        },
        "columnDefs": [
            { "orderable": false, "targets": 2 },
            { "searchable": false, "targets": 2 }
        ],
        "columns": [
            { "data": "batch" },
            { "data": "class" },
            {
                data: null, render: function (data, type, row) {
                    return " <td><button type='button' class='btn btn-warning' id='BtnEdit' onclick=GetById('" + row.id + "');>Edit</button> <button type='button' class='btn btn-danger' id='BtnDelete' onclick=Delete('" + row.id + "');>Delete</button ></td >";
                }
            },
        ]
    });
}); //load table BootCamp
/*--------------------------------------------------------------------------------------------------*/
function GetById(id) {
    debugger;
    $.ajax({
        url: "/BootCamp/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            $('#Id').val(result.id);
            $('#Batch').val(result.batch);
            $('#Class').val(result.class);
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
    var table = $('#BootCamp').DataTable({
        "ajax": {
            url: "/BootCamp/LoadBootCamp"
        }
    });
    var BootCamp = new Object();
    BootCamp.Batch = $('#Batch').val();
    BootCamp.Class = $('#Class').val();
    if ($('#Batch').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Batch Cannot be Empty',
        })
        return false;
    } else if ($('#Class').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Class Cannot be Empty',
        })
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: '/BootCamp/InsertOrUpdate',
            data: BootCamp,
        }).then((result) => {
            if (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 204) {
                Swal.fire({
                    icon: 'success',
                    potition: 'center',
                    title: 'BootCamp Add Successfully',
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
    var table = $('#BootCamp').DataTable({
        "ajax": {
            url: "/BootCamp/LoadBootCamp"
        }
    });
    var BootCamp = new Object();
    BootCamp.Id = $('#Id').val();
    BootCamp.Batch = $('#Batch').val();
    BootCamp.Class = $('#Class').val();
    $.ajax({
        type: 'POST',
        url: '/BootCamp/InsertOrUpdate',
        data: BootCamp
    }).then((result) => {
        debugger;
        //if (result.statusCode == 200) {
        if (isStatusCodeSuccess = true) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'BootCamp Update Successfully',
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
    var table = $('#BootCamp').DataTable({
        "ajax": {
            url: "/BootCamp/LoadBootCamp"
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
                url: "/BootCamp/Delete/",
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
    $('#Batch').val('');
    $('#Class').val('');
    $('#SaveBtn').show();
    $('#UpdateBtn').hide();
}); //fungsi btn add
/*--------------------------------------------------------------------------------------------------*/
function ClearScreen() {
    $('#Id').val('');
    $('#Batch').val('');
    $('#Class').val('');
} //Clear field