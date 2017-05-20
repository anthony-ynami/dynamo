function getSong(){

var lyrics = document.getElementById("lyrics").value;
document.getElementById("song").textContent = "";
  $.ajax({
    type: "GET",
    data: {
        apikey:"c8b3b1c0f05958773f39d19134e7a7d8",
        q_lyrics: lyrics,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data); 
        var first = data.message.body.track_list[0];
        console.log(first.track.album_coverart_350x350)
        console.log(first.track.lyrics_id)

        console.log(first.track.track_id)
        console.log(first.track.track_name)

        var thisTrack = (first.track.track_name)
        var thisPic = first.track.album_coverart_350x350;
        console.log(thisPic)

        var p = document.createElement("p");
        p.textContent = thisTrack;
        p.id = thisTrack;

        var img = document.createElement("img")
        img.setAttribute("src",thisPic)

        document.getElementById("response").appendChild(p).style.opacity = 0;
        document.getElementById("response").appendChild(img);
        document.getElementById("ghost").click();

    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };


 function getSongNow(){
    var trackId = document.getElementById("lyrics").textContent;
    console.log(trackId)
  $.ajax({
    type: "GET",
    data: {
        apikey:"445d6196c08dc2b7490929f18149d684",
        track_id: trackId,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data.message.body.lyrics.lyrics_body); 
      var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
       
        var j = document.createElement("p")
        j.textContent = lyricsBody
        document.getElementById("response").appendChild(j)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };