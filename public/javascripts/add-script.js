document.addEventListener('submit', e => {
    // Store reference to form to make later code easier to read
    const form = e.target;
    console.log("submit")
    let bodyContent = {};
    for (let [key, value] of new FormData(form).entries()) {
        bodyContent[key] = value;
    }
    bodyContent = JSON.stringify(bodyContent);



    // Post data using the Fetch API
    fetch(form.action, {
        mode: "cors",
        credentials: "same-origin",
        method: form.method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyContent,
        redirect: "follow",
        error: error(e)
    }).then(r => {
        console.log(r);
        console.log(r.status);
        if (r.redirected) {
            window.location.href = r.url;
        }
        else if(r.status == 400){
           let errorDom = document.getElementById("error");
           console.log("errorDom: " +errorDom);
           if(errorDom != null)
           {
                r.json().then(data => {
                    errorDom.innerText = data.message;
               })
           }
        }
    });
    // Prevent the default form submit
    e.preventDefault();

});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function error(e) {
    console.log("ewjpfoqj")
}