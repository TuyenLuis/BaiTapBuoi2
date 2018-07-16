var url = 'http://ajax-json.cione.vn/api/v1/documents';
var xhr = new XMLHttpRequest();
var output= document.getElementById('output');
var htmlDocument = createHtmlDocument();

xhr.onreadystatechange = handleResult;
xhr.open('POST', url);
xhr.send(createHtmlDocument());


function createHtmlDocument() {
  return document.implementation.createHTMLDocument();;
}

function handleResult(){
    if(xhr.readyState === XMLHttpRequest.DONE){
        output.innerHTML = xhr.responseText;
    }
}