
function sendRequest(url){
    var url = "http://ajax-json.cione.vn/api/v1/sync/timeout";
  var http = new XMLHttpRequest();
    http.open("POST",url, false);
    //Async thì ta đổi false -> true nhé các bạn
    http.send();
}