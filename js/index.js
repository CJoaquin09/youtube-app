let nextTkn = "";
let prevTkn = "";
function watchForm(tkn) {
    let url = "https://www.googleapis.com/youtube/v3/search"
    let apiKey = "AIzaSyDl3ZB3-m_GHVF121oGmg5RNJYMXcLrEIg";
    let search = $("#search").val();
    $("#form").on("submit", function (event) {
        event.preventDefault();
        $("#feed").html("");
        $("#prevNext").html("");
        $.ajax({
            url: url,
            data: {
                part: "snippet",
                q: search,
                key: apiKey,
                maxResults: 10,
                type: "video",
            },
            method: "GET",
            dataType: "json",
            success: function (responseJSON) {
                console.log(responseJSON);
                nextTkn = responseJSON.nextPageToken;
                var i;
                for (i in responseJSON.items) {
                    let thumb = responseJSON.items[i].snippet.thumbnails.medium.url;
                    let videoUrl = "https://www.youtube.com/watch?v=" + responseJSON.items[i].id.videoId;
                    let title = responseJSON.items[i].snippet.title;
                    $("#feed").append(`<a href="` + videoUrl + `" target="_blank"><li>
                                           <h3>`+ title + `</h3>
                                           <img src="` + thumb + `">
                                       </li></a>`);
                }
                $("#prevNext").append(`<button id="next">Next</button>`);
            },
            error: function (err) {
                console.log("Something went wrong");
            }
        });
    });

    $("#prevNext").on('click', '#next', function(ev){
        ev.preventDefault();
        $("#feed").html("");
        $("#prevNext").html("");
        prevTkn = nextTkn;
        console.log("Next binded");
        $.ajax({
            url: url,
            data: {
                part: "snippet",
                q: search,
                key: apiKey,
                maxResults: 10,
                type: "video",
                pageToken: nextTkn
            },
            method: "GET",
            dataType: "json",
            success: function (responseJSON) {
                console.log(responseJSON);
                nextTkn = responseJSON.nextPageToken;
                var i;
                for (i in responseJSON.items) {
                    let thumb = responseJSON.items[i].snippet.thumbnails.medium.url;
                    let videoUrl = "https://www.youtube.com/watch?v=" + responseJSON.items[i].id.videoId;
                    let title = responseJSON.items[i].snippet.title;
                    $("#feed").append(`<a href="` + videoUrl + `" target="_blank"><li>
                                           <h3>`+ title + `</h3>
                                           <img src="` + thumb + `">
                                       </li></a>`);
                }
                $("#prevNext").append(`<button id="next">Next</button>`);
            },
            error: function (err) {
                console.log("Something went wrong");
            }
        });
    })
}

watchForm();
