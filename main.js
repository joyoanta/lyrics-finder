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

// Api integration 

async function searchSongs(term) {
   const res = await fetch(`https://api.lyrics.ovh/suggest/${term}&limit=10`);
    const data = await res.json();
  
    showData(data);

    console.log(data)
 }

// Songs name Display 

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


                                                       // Standard Output

   result.innerHTML = `
   <ul class="songs">
      ${output}
   </ul>
   `;

                                              // Fancy outlook design 

// let output2 = '';
// data.data.forEach(song=>{

//    output2 +=   `
//                <div class="single-result row align-items-center my-3 p-3 re" id="result">
//                  <div class="col-md-9">
//                      <h3 class="lyrics-name"> ${song.title}</h3>
//                      <p class="author lead">Album by <span> ${song.artist.name}</span></p>
//                  </div>
//                  <div class="col-md-3 text-md-right text-center">
//                      <button class="btn btn-success" data-artist= "${song.artist.name}" data-songtitle = "${song.title}">Get Lyrics</button>
//                  </div>
//              </div>
//             `

// })

                                                         // output for fancy 

//    result.innerHTML = `
//    <div>
//    ${output2}
//    </div
//    `;


}

// Lyris Display 

async function getLyrics(songTitle, artist){

   const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
   const data = await res.json();

  const lyrics = data.lyrics;
  result.innerHTML = `<h2> ${songTitle}- ${artist} </h2>
  <span> <pre> ${lyrics} </pre> </span>`
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
