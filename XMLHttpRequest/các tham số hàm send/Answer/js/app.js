var url = 'http://ajax-json.cione.vn/api/v1/documents';
var xhr = new XMLHttpRequest();
var output = document.getElementById('output');
xhr.onreadystatechange = handleResult;
xhr.open('POST', url);
xhr.send(createHtmlDocument());

function handleResult() {
  if (xhr.readyState === this.DONE) {
    output.innerHTML = xhr.responseText;
  }
}

function createHtmlDocument() {
  return document.implementation.createHTMLDocument();;
}
