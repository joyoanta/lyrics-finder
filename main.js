document.getElementById('search-btn').addEventListener("click",function(){
   const searchData = document.getElementById('search-data').value ; 

   if (searchData == "" || searchData == null){

      alert ('Please Enter a song name')
   }
   else {
      findLyrics(searchData);
      // console.log("pressed")
   }

})

function findLyrics(song) {
   const searchBtn = document.getElementById('search-btn').value ; 
   fetch(`https://api.lyrics.ovh/suggest${song}`)
   .then(response => response.json())
   .then (data => {

      let songName ; 
      let artistName; 

   })





}