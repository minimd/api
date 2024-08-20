

let container=document.getElementById('container');
let info=document.getElementById('search-info');











 function searchBy(type, name, limit = 10, offset = 0) {
  fetch(
    `http://localhost/api/search/${type}/${name}/${limit}/${offset}`,
    { mode: "no-cors" }
  )
    .then((response) => response.json())
    .then((data) => {
      info.innerHTML=`<h2 id="search-by">searched by:${type}</h2>
        <h2 id="search-is">searched text is:${name}</h2>`
      console.log(data);
      data.forEach((item) => {        
        container.innerHTML += `<div class="cart">
            <img class="cart-image" src="https://via.placeholder.com/150" alt="" />
            <h3 class="cart-h3">${item.perfume_name}</h3>
            <p class="cart-p">${item.price}</p>
            <button class="cart-btn">view</button>
        </div>`;
      });
    });
}



let spaced = "hi i am a spaced string";
let unspaced = spaced.replace(/\s/g, "-");
console.log(spaced, unspaced);
console.log('suiiiiiiiiiiiiiiiiii');


let searchBtn = document.getElementById("search-btn");
let searchText = document.querySelector('#text-input');


searchBtn.addEventListener('click', () => {
searchBy('p.name', searchText.value);
});



