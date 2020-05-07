var datenow = new Date();
var Employee = [];
var Interview = [];

$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $.fn.dataTable.ext.errMode = 'none';
    $('#Interview').dataTable({
        "ajax": {
            url: "/Placement/LoadEmpInterview",
            type: "GET",
            dataType: "json",
            dataSrc: ""
        },
        "columnDefs": [
            { "orderable": false, "targets": 5 },
            { "searchable": false, "targets": 5 }
        ],
        "columns": [
            { data: "fullName" },
            { data: "companyName" },
            { data: "email" },
            { data: "title" },
            {
                data: "interviewDate", render: function (data) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                data: "status", render: function (data) {
                    return "<span class='badge badge-pill badge-info'>Waiting</span>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<td><div class='btn-group'><button class='btn btn-info' id='BtnAcc' data-toggle='tooltip' data-placement='top' title='Send Email' onclick=GetByStatus('" + row.id + "');><i class='fa fa-envelope'></i></button><button type='button' class='btn btn-danger' id='BtnDelete' data-toggle='tooltip' data-placement='top' title='Delete' data-original-title='Delete' onclick=Delete('" + row.id + "');><i class='fa fa-trash'></i></button></div></td>";
                }
            },
        ]
    });

    $('#Placement').dataTable({
        "ajax": {
            url: "/Placement/LoadEmpPlacement",
            type: "GET",
            dataType: "json",
            dataSrc: ""
        },
        "columnDefs": [
            { "orderable": false, "targets": 5 },
            { "searchable": false, "targets": 5 }
        ],
        "columns": [
            { "data": "fullName" },
            { "data": "companyName" },
            { "data": "email" },
            { "data": "title" },
            {
                "data": "interviewDate", "render": function (data) {
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                data: "status", render: function (data) {
                    return "<span class='badge badge-pill badge-info'>Waiting</span>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<td><div class='btn-group'> <button class='btn btn-info' id='BtnAcc2' data-toggle='tooltip' data-placement='top' title='' data-original-title='Confirmation' onclick=GetByStatus2('" + row.id + "');><i class='fa fa-check'></i></button> <button class='btn btn-danger' id='BtnCancel2' data-toggle='tooltip' data-placement='top' title='' data-original-title='Cancel' onclick=GetByStatus3('" + row.id + "');><i class='fa fa-minus'></i></button> </div></td>";
                }
            },
        ]
    });

    $('#History').dataTable({
        "ajax": {
            url: "/Placement/LoadHistory",
            type: "GET",
            dataType: "json",
            dataSrc: ""
        },
        "columns": [
            { data: "fullName" },
            { data: "companyName" },
            {
                data: "startContract", render: function (data) {
                    var date = moment(data).format('DD/MM/YYYY');
                    if (date == "01/01/0001") {
                        return "-";
                    } else {
                        return date;
                    }
                }
            },
            {
                data: "endContract", render: function (data) {
                    var date = moment(data).format('DD/MM/YYYY');
                    if (date == "01/01/0001") {
                        return "-";
                    } else {
                        return date;
                    }
                }
            },
            {
                data: "status", render: function (data) {
                    if (data == 2) {
                        return "<span class='badge badge-pill badge-success'>Done</span>";
                    }
                    else if (data == 3) {
                        return "<span class='badge badge-pill badge-danger'>Cancel</span>";
                    }

                }
            },
        ]
    });

    LoadEmployee($('#SelectEmployee'));
    LoadInterview($('#SelectInterview'));
}); //load table
/*--------------------------------------------------------------------------------------------------*/
function LoadEmployee(element) {
    if (Employee.length === 0) {
        $.ajax({
            type: "Get",
            url: "/Placement/LoadEmployee",
            success: function (data) {
                Employee = data;
                renderEmployee(element);
            }
        });
    }
    else {
        renderEmployee(element);
    }
} //load user/employee
function renderEmployee(element) {
    var $option = $(element);
    $option.empty();
    $option.append($('<option/>').val('0').text('Select Employee').hide());
    $.each(Employee, function (i, val) {
        $option.append($('<option/>').val(val.id).text(val.firstName + " " + val.lastName));
    });
} // Memasukan LoadEmployee ke Selectbox
/*--------------------------------------------------------------------------------------------------*/
function LoadInterview(element) {
    if (Interview.length === 0) {
        $.ajax({
            type: "Get",
            url: "/Interview/LoadInterview",
            success: function (data) {
                Interview = data;
                renderInterview(element);
            }
        });
    }
    else {
        renderInterview(element);
    }
} //load interview
function renderInterview(element) {
    var $option = $(element);
    $option.empty();
    $option.append($('<option/>').val('0').text('Select Interview').hide());
    $.each(Interview, function (i, val) {
        $option.append($('<option/>').val(val.id).text(val.title));
    });
} // Memasukan LoadInterview ke Selectbox
/*--------------------------------------------------------------------------------------------------*/
function clearscreen() {
    $('#Id').val('');
    $('#StartContract').val('');
    $('#EndContract').val('');
} //clear field
/*--------------------------------------------------------------------------------------------------*/
function GetByStatus(id) {
    debugger;
    $.ajax({
        url: "/Placement/GetByStatus/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            debugger;
            $('#Id').val(result[0].id);
            $('#UserId').val(result[0].userId);
            $('#Email').val(result[0].email);
            $('#FullName').val(result[0].fullName);
            $('#InterviewDate').val(result[0].interviewDate);
            $('#Description').val(result[0].addressInterview);
            ConfirmInterview();
            //$('#myModal').modal('show');
        },
        error: function (errormessage) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to Get Data',
            });
        }
    })
} //get data for confirm
function GetByStatus2(id) {
    //debugger;
    $.ajax({
        url: "/Placement/GetByStatus/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //debugger;
            $('#Id').val(result[0].id);
            $('#UserId').val(result[0].userId);
            $('#Email').val(result[0].email);
            $('#FullName').val(result[0].fullName);
            $('#InterviewDate').val(result[0].interviewDate);
            $('#Description').val(result[0].addressInterview);
            $('#StartContract').val('');
            $('#EndContract').val('');
            $('#myModal').modal('show');
        },
        error: function (errormessage) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to Get Data',
            });
        }
    })
} //get data for confirm

function GetByStatus3(id) {
    //debugger;
    $.ajax({
        url: "/Placement/GetByStatus/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //debugger;
            $('#Id').val(result[0].id);
            $('#UserId').val(result[0].userId);
            $('#Email').val(result[0].email);
            $('#FullName').val(result[0].fullName);
            $('#InterviewDate').val(result[0].interviewDate);
            $('#Description').val(result[0].addressInterview);
            Cancel();
        },
        error: function (errormessage) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to Get Data',
            });
        }
    })
} //get data for cancel

function ConfirmInterview() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Placement/LoadInterview/"
        }
    });
    var table2 = $('#Placement').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement/"
        }
    });
    var table3 = $('#History').DataTable({
        "ajax": {
            url: "/Placement/LoadHistory/"
        }
    });
    Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to Revert this!",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, Confirmation!",
        cancelButtonColor: "Red",
    }).then((result) => {
        if (result.value) {
            var Placement = new Object();
            Placement.Id = $('#Id').val();
            Placement.UserId = $('#UserId').val();
            Placement.Email = $('#Email').val();
            Placement.FullName = $('#FullName').val();
            Placement.InterviewDate = $('#InterviewDate').val();
            Placement.DescriptionInterview = $('#Description').val();
            $.ajax({
                type: 'POST',
                url: '/Placement/ConfirmInterview',
                data: Placement
            }).then((result) => {
                //debugger;
                if (result.statusCode === 200) {
                    Swal.fire({
                        icon: 'success',
                        potition: 'center',
                        title: 'Confirmation Interview Success',
                        timer: 2500
                    }).then(function () {
                        table.ajax.reload();
                        table2.ajax.reload();
                        table3.ajax.reload();
                        LoadEmployee($('#SelectEmployee'));
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to Confirmation',
                    });
                }
            })
        }
    })
}

function AssignEmployee() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table2 = $('#Placement').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table3 = $('#History').DataTable({
        "ajax": {
            url: "/Placement/LoadHistory"
        }
    });
    debugger;
    var Placement = new Object();
    Placement.UserId = $('#SelectEmployee').val();
    Placement.InterviewId = $('#SelectInterview').val();
    $.ajax({
        type: 'POST',
        url: '/Placement/AssignEmployee',
        data: Placement
    }).then((result) => {
        if (result.statusCode === 200) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Assign Employee Success',
                timer: 2500
            }).then(function () {
                table.ajax.reload();
                table2.ajax.reload();
                table3.ajax.reload();
                $('#ModalAssign').modal('hide');
                $('#SelectEmployee').val(0);
                $('#SelectInterview').val(0);
            });
        }
        else {
            Swal.fire('Error', 'Failed to Assign Employee', 'error');
        }
    })
} //function Assign Employee
/*--------------------------------------------------------------------------------------------------*/
function ConfirmPlacement() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table2 = $('#Placement').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table3 = $('#History').DataTable({
        "ajax": {
            url: "/Placement/LoadHistory"
        }
    });
    var startDate = new Date($('#StartContract').val());
    var endDate = new Date($('#EndContract').val());

    if ($('#StartContract').val() == "" || $('#EndContract').val() == "") {
        Swal.fire({
            icon: 'error',
            potition: 'center',
            title: 'Field cannot be Empty!',
            timer: 2000
        })
    }
    else if (startDate >= endDate) {
        Swal.fire({
            icon: 'error',
            potition: 'center',
            title: 'Incorrect Start or End Date!',
            timer: 2000
        })
    } else {
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to Revert this!",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirmation!",
            cancelButtonColor: "Red",
        }).then((result) => {
            if (result.value) {
                var Placement = new Object();
                Placement.id = $('#Id').val();
                Placement.Email = $('#Email').val();
                Placement.FullName = $('#FullName').val();
                Placement.InterviewDate = $('#InterviewDate').val();
                Placement.DescriptionInterview = $('#Description').val();
                Placement.StartContract = $('#StartContract').val();
                Placement.EndContract = $('#EndContract').val();
                $.ajax({
                    type: 'POST',
                    url: '/Placement/ConfirmPlacement',
                    data: Placement
                }).then((result) => {
                    if (result.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            potition: 'center',
                            title: 'Confirmation Placement Success',
                            timer: 2500
                        }).then(function () {
                            table.ajax.reload();
                            table2.ajax.reload();
                            table3.ajax.reload();
                            $('#myModal').modal('hide');
                            clearscreen();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to Confirmation',
                        });
                    }
                })
            }
        })
    }
}//function confirmation placement
/*--------------------------------------------------------------------------------------------------*/
function Cancel() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table2 = $('#Placement').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table3 = $('#History').DataTable({
        "ajax": {
            url: "/Placement/LoadHistory"
        }
    });

    Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to Revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, Confirmation!",
        cancelButtonColor: "Red",
    }).then((result) => {
        if (result.value) {
            var Placement = new Object();
            Placement.id = $('#Id').val();
            Placement.UserId = $('#UserId').val();
            Placement.Email = $('#Email').val();
            Placement.FullName = $('#FullName').val();
            Placement.InterviewDate = $('#InterviewDate').val();
            Placement.DescriptionInterview = $('#Description').val();
            $.ajax({
                type: 'POST',
                url: '/Placement/CancelPlacement',
                data: Placement
            }).then((result) => {
                if (result.statusCode === 200) {
                    Swal.fire({
                        icon: 'success',
                        potition: 'center',
                        title: 'Cancel Placement Success',
                        timer: 2500
                    }).then(function () {
                        table.ajax.reload();
                        table2.ajax.reload();
                        table3.ajax.reload();
                        clearscreen();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to Cancel',
                    });
                }
            })
        }
    })
}//function Cancel
/*--------------------------------------------------------------------------------------------------*/
function Delete(Id) {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Interview').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table2 = $('#Placement').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement"
        }
    });
    var table3 = $('#History').DataTable({
        "ajax": {
            url: "/Placement/LoadHistory"
        }
    });
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to Revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "/Placement/Delete/",
                data: { Id: Id }
            }).then((result) => {
                debugger;
                if (result.statusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Delete Successfully',
                        timer: 2500
                    }).then(function () {
                        table.ajax.reload();
                        table2.ajax.reload();
                        table3.ajax.reload();
                        clearscreen();
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