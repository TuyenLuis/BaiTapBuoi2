var url = 'http://ajax-json.cione.vn/api/v1/request/timeout';
var xhr = new XMLHttpRequest();
var output = document.getElementById('output');

xhr.onreadystatechange = handleResult;
xhr.timeout = 2000;

xhr.open('POST', url);
xhr.send('TimeoutErr');

function handleResult(){
    if(xhr.readyState === XMLHttpRequest.DONE){
        output.innerHTML = xhr.responseText;
    }
}
