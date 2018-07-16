var input = document.querySelector('#selectFile');
var button = document.querySelector('button');
input.addEventListener('change', function(evt){
    var file = document.querySelector('#selectFile').files[0];
    sendFile(file);
})
button.addEventListener('click', function(){
    cancelUploadFile();
})

var xhr = new XMLHttpRequest();

function sendFile(file){
    var url = 'http://ajax-json.cione.vn/api/v1/files/upload';
    var output = document.getElementById('output');
    
    xhr.onreadystatechange = handleResult;
    
    xhr.open('POST', url);
    xhr.send(file);
    
    function handleResult(){
        if(xhr.readyState === this.DONE){
            output.innerHTML = xhr.responseText;
        }
    }
}

function cancelUploadFile(file){
    xhr.abort();
}