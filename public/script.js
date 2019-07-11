let item = document.getElementsByClassName('fileitem');


function fileItemHandler(event) {
    window.location.href = `http://127.0.0.1:3000/${event.target.id}/${event.target.getAttribute('name')}`;
}

for(let i=0; i<item.length; i++) {
    item[i].addEventListener('click', fileItemHandler);
}