$(document).ready(function($) {
    $(".clickable-row").click(function() {
        let href = $(this).data("href")
        window.location.href = "/workout/details?workoutId=" + href;
    });
}); 