function sendURLSearchParams(){
    var url = 'http://ajax-json.cione.vn/api/v1/forms/urlparams';
    var output = document.getElementById('output');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handleResult;

    xhr.open('POST', url);
    var params = createParams();

    xhr.send(params.toString());
    function handleResult(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            output.innerHTML = xhr.responseText;
        }
    }
}

var button = document.getElementById('submit');
function createParams(){
    var params = new URLSearchParams();
    params.append('fullname', 'Hoang Van Tuyen');
    params.append('address', 'Ha Noi');
    return params;
}

button.addEventListener('click', function(){
    sendURLSearchParams();
})
