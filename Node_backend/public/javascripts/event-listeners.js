$(document).ready(function() {// first load - only loads on page load/refresh
  console.log("loaded")
  updateSelectedNav(window.location.pathname)
  let url;
  $('a').click(function (event) {
      event.preventDefault(); 
      if(url != $(this).attr('href')){ // don't load same page we are already at
        url = $(this).attr('href')
        updateSelectedNav(url)
        $.get(url, function(data) {
          console.log("get", url)
          window.history.pushState(data, "ITTWEB Lab 2a - ejs", url)
          // code to display/render your new page content
          // supposing data holds valid HTML
          var bodyHtml = /<div.*? id="content-container">([\s\S]*)<\/div>/.exec(data)[1];
          let body = $('#content-container');
          body.html(bodyHtml);
        });
      }
      
    });
});

function updateSelectedNav(url)
{
  $('ul.menu li a').each(function(){
    var $href = $(this).attr('href');
    if ( ($href == url) || ($href == '') ) {
        $(this).addClass('current-page');
    } else {
        $(this).removeClass('current-page');
    }
});
}