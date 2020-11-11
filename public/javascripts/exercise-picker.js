$(document).ready(function($) {

    $(".exercises-picker-item").on("click", function() {
        if ($(this).hasClass("active-item"))
        {
            $(this).removeClass("active-item");
        }
        else
        {
            $(this).addClass("active-item");
        }
    });

    $("#remove-exercise-btn").on("click", function() {
        let isDetails = $(this).data("isdetails");

        $(".added").each(function() {
            if ($(this).hasClass("active-item")){
                $(this).removeClass("active-item");
                $(this).addClass("not-added");
                $(this).removeClass("added");
                $(this).appendTo("#exercises-picker-left");

                if(isDetails == true){
                    let workoutId = $(this).data("workout-id");
                    let exerciseId = $(this).data("exercise-id");

                    formdata = {
                        workoutId : workoutId,
                        exerciseId :  exerciseId
                    }

                    $.ajax({
                        url: '/workout/removeExercise',
                        type: 'POST',
                        contentType : "application/json",
                        data: JSON.stringify(formdata),
                        dataType: 'json',
                        error: function() {
                            console.log("An error has occureds")
                        },
                        success: function(data) {
                            console.log("Success response")
                            $('#removed-exercise-alert').removeClass("fade")
                        },
                    });
                }
            }
        })
    })

    $("#add-exercise-btn").on("click", function() {
        let isDetails = $(this).data("isdetails");
        $(".not-added").each(function() {
            if ($(this).hasClass("active-item")){
                $(this).removeClass("active-item");
                $(this).removeClass("not-added");
                $(this).addClass("added");
                $(this).appendTo("#exercises-picker-right");

                if(isDetails == true){
                    let workoutId = $(this).data("workout-id");
                    let exerciseId = $(this).data("exercise-id");
                
                    formdata = {
                        workoutId : workoutId,
                        exerciseId :  exerciseId
                    }
                
                    $.ajax({
                        url: '/workout/addExercise',
                        type: 'POST',
                        contentType : "application/json",
                        data: JSON.stringify(formdata),
                        dataType: 'json',
                        error: function() {
                            console.log("An error has occureds")
                        },
                        success: function(data) {
                            console.log("Success response")
                            $('#added-exercise-alert').removeClass("fade")
                        },
                     });
                }
            }
        })
    })  

    $("#create-btn").on("click", function(){
        let addedElements = $(".added");
        let exerciseIds = addedElements.map(function() {
            let id = $(this).data("exerciseId");
            return id;
        });

        let name = $("#name").val();

        formdata = {
            name : name,
            exerciseIds :  exerciseIds
        }

        $.ajax({
            url: '/workout/add',
            type: 'POST',
            contentType : "application/json",
            data: JSON.stringify(formdata),
            dataType: 'json',
            error: function() {
                console.log("An error has occureds")
            },
            success: function(data) {
                console.log("Success response")
                window.location.href = "/workout/list";
            },
         });
    });

});


function oldStuff() {



    
}
