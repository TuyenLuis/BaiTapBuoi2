
var $search = $("#search");
var $resultList = $("#result-list");
var $input = $("#keyword");
var currentValue = "";
var nextValue = "";
var nextPageToken = "";
var startTimer;
var isPaused = false;
$(document).ready(() => {
    
    ///////////////// Không Click Submit //////////////////////////////////////////////////
//    $("#submitbtn").hide(); 
//    $input.on("focus", () => {
//        isPaused = false;
//        
//    });
//    $input.on("focusout", () => {
//        isPaused = true;
//    });
//    
//    var check = setInterval(() => {
//        console.log(isPaused);
//        if(!isPaused){
//            startTimer = setInterval(sendRequest, 2000);
//        }
//        else{
//            clearInterval(startTimer);
//            
//        }
//    }, 2000)
    ////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    ///////////////// Click Submit ///////////////////////////////////////////////////////
        $("#submitbtn").click(() => {
            $(".loading-img").show();
        })
        $search.on("submit", (evt) => {
            evt.preventDefault();
            $resultList.find('a').remove();
            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + $input.val() + "&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw" + "&pageToken=" + nextPageToken,
                method: "GET",
                success: (body) => {
                    $(".loading-img").hide();
                    console.log(body);
                    nextPageToken = body.nextPageToken;
                    console.log(nextPageToken);
                    createItem(body, $resultList);
                    
                    
                    var checkScrollAtBottom = setInterval(() => {
                        if ($(window).scrollTop() + 600 >= $resultList.find("a").last().offset().top) {
                            $(".loading").show();
                            $.ajax({
                                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + $("#keyword").val() + "&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw" + "&pageToken=" + nextPageToken,
                                method: "GET",
                                success: (body) => {
                                    $(".loading").remove();
                                    console.log(body);
                                    if (body.nextPageToken) {
                                        nextPageToken = body.nextPageToken;
                                    }
                                    else {
                                        nextPageToken = "";
                                        alert("Đến đây là hết rồi");
                                        clearInterval(checkScrollAtBottom);
                                    }
                                    createItem(body, $resultList);
                                }
                            })
                        }
                    }, 500);
                    
                }
            })
        })
    ////////////////////////////////////////////////////////////////////////////////////////
})


//function sendRequest() {
//    if($input.val() === "") {
//            $(".loading-img").hide();
//            $resultList.find('a').remove()
//        }
//        else{
//            $resultList.find('a').remove();
//                $(".loading-img").show();
//                $.ajax({
//                    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + $input.val() +             "&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw" + "&pageToken=" + nextPageToken,
//                    method: "GET",
//                    success: (body) => {
//                        $(".loading-img").hide();
//                        nextPageToken = body.nextPageToken;
//                        createItem(body);
//                        var checkScrollAtBottom = setInterval(() => {
//                            if ($(window).scrollTop() + 1000 >= $resultList.find("a").last().offset().top) {
//                                $(".loading").show();
//                                $.ajax({
//                                    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +         $("#keyword").val() + "&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw" +                     "&pageToken=" + nextPageToken,
//                                    method: "GET",
//                                    success: (body) => {
//                                        
//                                        $(".loading").hide();
//                                        if (body.nextPageToken) {
//                                            nextPageToken = body.nextPageToken;
//                                        }
//                                        else {
//                                            nextPageToken = "";
//                                            alert("Đến đây là hết rồi");
//                                            clearInterval(checkScrollAtBottom);
//                                        }
//                                        createItem(body);
//                                    }
//                                })
//                            }
//                        }, 500);
//
//                    }
//                })
//        }
//}


function createItem(body) {
    let listItems = body.items;
    for (let i = 0; i < listItems.length; i++) {
        let link = $("<a></a>");
        let img = $("<img>");
        let information = $("<div></div>");
        let title = $("<h2></h2>");
        let description = $("<p></p>");
        let view = $("<span></span>");

        link.append(img);
        link.append(information);
        information.append(title);
        information.append(description);
        information.append(view);
        
        link.attr("href", "https://www.youtube.com/watch?v=" + listItems[i].id.videoId + "?autoplay=true");
        link.attr("target", "_blank");
        link.addClass("result col-md-12");


        img.attr("src", listItems[i].snippet.thumbnails.medium.url);
        information.addClass("video_infor");
        title.addClass("title");
        description.addClass("description").text(listItems[i].snippet.description);

        view.text("View >>");
        

        $resultList.append(link);
    }
    //<img src="./img/Loading_icon.gif" alt="loading-img" class="col-md-3 loading-img">
    let loading = $("<img>");
    loading.attr("src", "./img/Loading_icon.gif");
    loading.addClass("col-md-3 loading-img loading");
    $resultList.append(loading);
    loading.hide();
}