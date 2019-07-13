let downloadBtn = document.getElementsByClassName('downloadbtn');
let homeBtn = document.getElementById('homebtn');

downloadBtn[0].addEventListener('click', (event) => {
    window.location.href = `http://127.0.0.1:3000/${event.target.id}/${event.target.getAttribute('name')}`;
});

homeBtn.addEventListener('click', (event) => {
    window.location.href = `http://127.0.0.1:3000`;
});