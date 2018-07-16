var url = 'http://ajax-json.cione.vn/api/v1/headers/authentication';
var xhr = new XMLHttpRequest();
var output = document.getElementById('output');

xhr.onreadystatechange = handleResult;

xhr.open('GET', url);
xhr.setRequestHeader('Authentication', 'CiOne');
xhr.send();

function handleResult(){
    if(xhr.readyState === XMLHttpRequest.DONE){
        output.innerHTML = xhr.responseText;
    }
}