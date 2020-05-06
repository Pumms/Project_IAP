var datenow = new Date();
var Employee = [];
var Interview = [];

$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $.fn.dataTable.ext.errMode = 'none';
    //debugger;

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
                    return moment(data).format('DD/MM/YYYY, h:mm a');
                }
            },
            {
                data: "status", render: function (data) {
                    return "<span class='badge badge-pill badge-info'>Confirmation for Interview</span>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<td><div class='btn-group'><button type='button' class='btn btn-secondary' id='BtnDetail' data-toggle='tooltip' data-placement='top' title='Detail' onclick=Detail('" + row.id + "');><i class='mdi mdi-open-in-new'></i></button> <button class='btn  btn-success' id='BtnAcc' data-toggle='tooltip' data-placement='top' title='Accept Interview' onclick=GetByStatus('" + row.id + "');><i class='mdi mdi-check'></i></button>";
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
                    return moment(data).format('DD/MM/YYYY, h:mm a');
                }
            },
            {
                data: "status", render: function (data) {
                    return "<span class='badge badge-pill badge-info'>Waiting</span>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<td><div class='btn-group'><button type='button' class='btn btn-secondary' id='BtnDetail2' data-toggle='tooltip' data-placement='top' title='Detail' data-original-title='Detail' onclick=Detail('" + row.id + "');><i class='fa fa-external-link'></i></button> <button class='btn btn-success' id='BtnAcc2' data-toggle='tooltip' data-placement='top' title='' data-original-title='Confirmation' onclick=GetByStatus2('" + row.id + "');><i class='fa fa-check'></i></button>";
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
                    return moment(data).format('DD/MM/YYYY, h:mm a');
                }
            },
            {
                data: "status", render: function (data) {
                    if (data = 2) {
                        return "<span class='badge badge-pill badge-success'>Done</span>";
                    }
                    else if (data = 3) {
                        return "<span class='badge badge-pill badge-danger'>Cancel</span>";
                    }
                }
            },
            //{
            //    data: null, render: function (data, type, row) {
            //        return "<td><button type='button' class='btn btn-secondary' id='BtnDetail2' data-toggle='tooltip' data-placement='top' data-original-title='Detail' onclick=GetByStatus('" + row.id + "');><i class='fa fa-external-link'></i></button></td>";
            //    }
            //},
        ]
    });
    LoadEmployee($('#SelectEmployee'));
    LoadInterview($('#SelectInterview'));
}); //load table Placement
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
} //load company
function renderEmployee(element) {
    var $option = $(element);
    $option.empty();
    $option.append($('<option/>').val('0').text('Select Employee').hide());
    $.each(Employee, function (i, val) {
        $option.append($('<option/>').val(val.id).text(val.firstName +" "+ val.lastName));
    });
} // Memasukan LoadEmployee ke dropdown
/*--------------------------------------------------------------------------------------------------*/function LoadInterview(element) {
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
} //load company
function renderInterview(element) {
    var $option = $(element);
    $option.empty();
    $option.append($('<option/>').val('0').text('Select Interview').hide());
    $.each(Interview, function (i, val) {
        $option.append($('<option/>').val(val.id).text(val.title));
    });
} // Memasukan LoadEmployee ke dropdown
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
            $('#Email').val(result[0].email);
            $('#FullName').val(result[0].fullName);
            $('#InterviewDate').val(result[0].interviewDate);
            $('#Description').val(result[0].descriptionInterview);
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
            $('#Email').val(result[0].email);
            $('#FullName').val(result[0].fullName);
            $('#InterviewDate').val(result[0].interviewDate);
            $('#Description').val(result[0].descriptionInterview);
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
    //debugger;
    Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to Revert this!",
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, Confirmation!",
        cancelButtonColor: "Red",
    }).then((result) => {
        //debugger;
        if (result.value) {
            var Placement = new Object();
            Placement.Id = $('#Id').val();
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
} //function save
/*--------------------------------------------------------------------------------------------------*/
function ConfirmPlacement() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Placement').DataTable({
        "ajax": {
            url: "/Placement/LoadPlacement/"
        }
    });
    var table2 = $('#History').DataTable({
        "ajax": {
            url: "/Placement/LoadHistory/"
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
                Placement.Id = $('#Id').val();
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
                    //debugger;
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
function Cancel(Id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.value) {
            ////debugger;
            $.ajax({
                url: "/Placement/Cancel/",
                data: { Id: Id }
            }).then((result) => {
                ////debugger;
                if (result.statusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Delete Successfully',
                        timer: 2000
                    }).then(function () {
                        table.ajax.reload();
                        cls();
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: 'Failed to Delete',
                    })
                }
            })
        }
    });
} //function delete



