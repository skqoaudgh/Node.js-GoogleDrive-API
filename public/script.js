let item = document.getElementsByClassName('fileitem');
let downloadBtn = document.getElementsByClassName('downloadbtn');

for(let i=0; i<item.length; i++) {
    item[i].addEventListener('click', (event) => {
        window.location.href = `http://127.0.0.1:3000/${event.target.innerHTML}`;
    });
}

downloadBtn[0].addEventListener('click', (event) => {
    window.location.href = `http://127.0.0.1:3000/${event.target.id}/${event.target.getAttribute('name')}`;
});