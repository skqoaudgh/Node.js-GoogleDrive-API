let item = document.getElementsByClassName('fileitem');
let homeBtn = document.getElementById('homebtn');

function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

for(let i=0; i<item.length; i++) {
    item[i].addEventListener('click', (event) => {
        window.location.href = `http://127.0.0.1:3000/${event.target.innerHTML}`;
    });
}

homeBtn.addEventListener('click', (event) => {
    window.location.href = `http://127.0.0.1:3000`;
});