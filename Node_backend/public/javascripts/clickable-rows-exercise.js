$(document).ready(function($) {
    $(".clickable-row").click(function() {
        let href = $(this).data("href")
        window.location.href = "/exercise/details?exerciseId=" + href;
    });
}); 