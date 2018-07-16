//Todo
var url = 'http://ajax-json.cione.vn/api/v1/sync/timeout';
function sendRequest(){
    var http = new XMLHttpRequest();
    http.open('POST', url,true);
    http.send();
}
sendRequest();
sendRequest();