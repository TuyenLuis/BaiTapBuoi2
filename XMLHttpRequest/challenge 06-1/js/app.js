
function sendArrayBuffer(){
    var url = 'http://ajax-json.cione.vn/api/v1/arraybuffers/upload';
    //khoi tao xml request
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = handleResult;
    xhr.open("POST", url);
    var arrayBuffer = createArrayBuffer();
    xhr.send(arrayBuffer);
    
    function handleResult(){
        if(xhr.readyState === this.DONE){
            document.querySelector("#output").innerHTML = xhr.responseText;
        }
    }
}

function createArrayBuffer(){
    var contentBuffer = new ArrayBuffer(8);
    var viewBuffer = new Uint8Array(contentBuffer);
    var data = "CiOne.vn";
    viewBuffer.set([
        data.charCodeAt(),
        data.charCodeAt(1),
        data.charCodeAt(2),
        data.charCodeAt(3),
        data.charCodeAt(4),
        data.charCodeAt(5),
        data.charCodeAt(6),
        data.charCodeAt(7)
    ]);
    
    return viewBuffer;
}

var button = document.querySelector("#submit");
button.addEventListener("click", function(){
   sendArrayBuffer(); 
});