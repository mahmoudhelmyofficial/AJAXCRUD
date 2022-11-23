//students controller;

showInPopup = (url) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            $("#form-modal .modal-body").html(res);
/*            $("#form-modal .modal-title").html(title);*/
            $("#form-modal").modal('show');
        }
    })
}


$(document).ready(function () {
    $(".js-delete").on('click', function () {
        var btn = $(this);

        var result = confirm('are you sure that you want to delete this student ??');

        if (result) {

            $.ajax({
                  
                url: '/Students/Delete/' + btn.data('id'),

                type: "POST",

                success: function () {
                    btn.parents(".line-parent").fadeOut();
                },

                error: function (err) {
                    console.log(err);
                }
            })
        }
    })
})



$(document).ready(function ()
{
    $("#btn").click(function () {
        $("#test").fadeToggle();
    })
})

//men controller;

BackToList =()=> $('#form-modal').modal('toggle');

showInPopup = (url) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            $("#form-modal .modal-body").html(res);
            $("#form-modal").modal('show');
        }
    })
}


SaveMen=()=>{
    var id = $('#id').val();
    var name = $('#name').val();
    var age = $('#age').val();

    var men = new Object();

    men.name = name;
    men.age = age;

    $.ajax({
        type: 'POST',
        url: '/Men/Create',
        data: men,
        success: function (man) {

            $('#form-modal').modal('toggle');

            var table = $('#tbll');

            var newRow = "<tr>" +
                "<td>" + man.name + "</td>" +
                "<td>" + man.age + "</td>" +
                "</tr>";

            table.append(newRow);

        },
        err: function (err) {
            console.log(err);
        }
      
    })


};


EditeMan =(id)=> {
    $.ajax({
        type: "GET",
        url: "/Men/Edit/" + id,
        success: function (res) {
            $("#form-modal .modal-body").html(res);
            $("#form-modal").modal('show');
        },
        error:function(err) {
            console.log(err);
        }
    })
}

ManDetails = (id) => {
    $.ajax({
        type: "GET",
        url: "/Men/Details/" + id,
        success: function (res) {
            $("#form-modal .modal-body").html(res);
            $("#form-modal").modal('show');
        },
        error: function (err) {
            console.log(err);
        }
    })
}
//Delete Man
$(document).ready(function () {
    $(".dltbtn").on('click', function () {
        var btn = $(this);

        var result = confirm('are you sure that you want to delete this student ??');

        if (result) {

            $.ajax({

                url: '/Men/Delete/' + btn.data('id'),

                type: "POST",

                success: function () {
                    btn.parents(".trtable").fadeOut();
                },

                error: function (err) {
                    console.log(err);
                }
            })
        }
    })
})

//Get All Men
$.ajax({
    type: 'GET',
    url: '/Men/PartialIndex',
    success: function (data) {

        var table = $('#tbll');

        for (var i = 0; i < data.length; i++) {

            var newRow = "<tr class='ttrr'>" +
                "<td class='name'>" + data[i].name + "</td>" +
                "<td class=''age>" + data[i].age + "</td>" +
                "</tr>";

            table.append(newRow);
        }



    },
    error: function (err) {
        console.log(err);
    }
})

//Sreach

//$(document).ready(function () {

//    $('.searchbar').on("keyup", function () {

//        var name = $('.searchbar').val();
//        var table = $('.tbll');

//        $.ajax({
//            type: "POST",
//            url: "/Men/Search/" + name,
//            success: function (data) {

//                $('.ttrr').html("");

//                $.each(data, function (index, value) {
//                    var newRow = "<tr>" +
//                        "<td>" + value.name + "</td>" +
//                        "<td>" + value.age + "</td>" +
//                        "</tr>";

//                    $table.append(newRow);
//                });

//                //for (var i = 0; i < data.length; i++) {

//                //    var newRow = "<tr>" +
//                //        "<td>" + data[i].name + "</td>" +
//                //        "<td>" + data[i].age + "</td>" +
//                //        "</tr>";


//                //    table.append(newRow);
//                //}
//            },
//            error: function (err) {
//                console.log(err);
//            }
//        })
//    })


//})


$(document).ready(function () {
    $('.searchbar').on("keyup", function () {
        var text = $(this).val();
        console.log(text);
        $('.tbll .ttrr').each(function (results) {
            if (results !== 0) {
                var name = $(".ttrrr .name").val();

                if (name !== 0 && name == text) {
                    $(this).hide();
                }
                else {
                    $(this).show();
                }
            }
        })
    })
})