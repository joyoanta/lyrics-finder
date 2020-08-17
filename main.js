const form = document.getElementById('form'); 
const search = document.getElementById('search'); 
const result = document.getElementById('result'); 
const more = document.getElementById('more'); 

// event listeners

form.addEventListener('submit', function(e) {
   e.preventDefault(); 
   const searchTerm = search.value ; 
   
   if(searchTerm == ''|| searchTerm == null){
      alert (" Plaeas Enter a song name !! ")
   }
   else{
      searchSongs (searchTerm); 
   }

})

async function searchSongs(term) {
   const res = await fetch(`https://api.lyrics.ovh/suggest/${term}&limit=10`);
    const data = await res.json();
  
    showData(data);

    console.log(data)
 }



function showData(data){

   let output = '';
   data.data.forEach(song => {
      output += ` 
      
      <li> 
         <span><strong> ${song.title} </strong> Album by  ${song.artist.name} </span>
         <button class="btn btn-success" data-artist= "${song.artist.name}" data-songtitle = "${song.title}">Get Lyrics</button>
      </li>
      `;
   });
   
   result.innerHTML = `
   <ul class="songs">
      ${output}
   </ul>
   `;
   
}


async function getLyrics(songTitle, artist){

   const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
   const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r |\n)/g,"<br>");
  result.innerHTML = `<h2> ${songTitle}- ${artist} </h2>
  <span> ${lyrics} </span>`
}

// Lyrics Button 

result.addEventListener ("click", function(e){

   const buttonPress = e.target;

   if (buttonPress.tagName === "BUTTON" ){

      const songTitle =  buttonPress.getAttribute ('data-songtitle');
      const artist =  buttonPress.getAttribute ('data-artist');

      getLyrics(songTitle, artist);
   }
})




   // function searchSongs (term){

   //    fetch (`https://api.lyrics.ovh/suggest/${term}`)
   //    .then (res => res.json())
   //    .then (data => console.log(data));
   
   //    showData (data); 

    
   
