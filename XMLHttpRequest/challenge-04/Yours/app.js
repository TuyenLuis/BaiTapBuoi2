//Todo
var url = 'http://ajax-json.cione.vn/api/v1/messages';
var xhr = new XMLHttpRequest();
var output = document.getElementById('output');

xhr.onreadystatechange = handleResult;
xhr.open('POST', url);
xhr.send('Hello server');

function handleResult(){
    if(xhr.readyState === XMLHttpRequest.DONE){
        output.innerHTML = xhr.responseText;
    }
}