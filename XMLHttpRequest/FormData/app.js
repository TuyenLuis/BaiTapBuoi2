function sendFormData(){
    var url = 'http://ajax-json.cione.vn/api/v1/forms/formdata';
    var output = document.getElementById('output');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = handleResult;

    xhr.open('POST', url);
    var formData = createFormData();

    xhr.send(formData);
    function handleResult(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            output.innerHTML = xhr.responseText;
        }
    }
}

var button = document.getElementById('submit');
function createFormData(){
    var formData = new FormData();
    formData.append('fullname', 'Hoang Van Tuyen');
    formData.append('address', 'Ha Noi');
    return formData;
}

button.addEventListener('click', function(){
    sendFormData();
})
