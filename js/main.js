document.addEventListener('DOMContentLoaded', () => {
    var status = document.getElementById("my-form-status");
    status.style = "display: none ";
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});

window.addEventListener("DOMContentLoaded", function () {

    // get the form elements defined in your form HTML above

    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");
    var statusContent = document.getElementById("my-form-staus-content");
    var contentGood = document.createTextNode("Mensaje enviado correctamente!");
    var contentBad = document.createTextNode("Oops! No se pudo enviar el mensaje");
    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        button.style = "display: none ";
        status.style = "display: block ";
        statusContent.appendChild(contentGood);
    }

    function error() {
        status.classList.add('is-danger');
        statusContent.appendChild(contentBad);
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        button.disabled = false
        button.classList.add('is-loading');
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}