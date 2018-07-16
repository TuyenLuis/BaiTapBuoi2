//Todo
var url = 'http://ajax-json.cione.vn/api/v1/products';
var xhr = new XMLHttpRequest();
var output = document.getElementById('output');

xhr.onreadystatechange = handleResult;
xhr.open('GET', url);
xhr.send();

function handleResult(){
  if(xhr.readyState === XMLHttpRequest.DONE){
    output.innerHTML = xhr.responseText;
    alert('Gửi dữ liệu xong');
  }
  else if(xhr.readyState === XMLHttpRequest.LOADING){
    alert('Đang load dữ liệu');
  }
  else if(xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED){
    alert('Đang  nhận headers');
  }
  else if(xhr.readyState === XMLHttpRequest.OPENED){
    alert('Đang gọi phương thức open');
  }
  else if(xhr.readyState === XMLHttpRequest.UNSENT){
    alert('Khởi tạo đối tượng')
  }
}
