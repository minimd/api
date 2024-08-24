// let container = document.getElementById("container");
// let info = document.getElementById("search-info");

// function searchBy(type, name, limit = 10, offset = 0) {
// 	fetch(`http://localhost/api/search/${type}/${name}/${limit}/${offset}`, {
// 		mode: "no-cors",
// 	})
// 		.then((response) => response.json())
// 		.then((data) => {
// 			info.innerHTML = `<h2 id="search-by">searched by: ${type}</h2>
//                         <h2 id="search-is">searched text is: ${name}</h2>`;
// 			console.log(data);
// 			container.innerHTML = "";

// 			data.forEach((item, index) => {
// 				let notes_names = item.all_note_names.split(",");
// 				let perfumers = item.perfumer.split(",");

// 				container.innerHTML += `<div class="cart">
//               <img class="cart-image" src="${item.perfume_image}" alt="" />
//               <h3 class="cart-h3">${item.perfume_name.replace("-", " ")}</h3>
//               <p class="cart-p">${item.price}</p>
//               <button class="cart-btn">view</button>
//               <p class="cart-p brand-name">Brand :${item.brand_name}</p>
//               <p class="cart-p">`;

// 				JSON.parse(item.all_notes).forEach((element, i) => {
// 					document.querySelectorAll(".cart")[index].innerHTML += `<p class="cart-p all-notes" value="${element}">${notes_names[i]}</p>`;
// 				});

// 				document.querySelectorAll(".cart")[
// 					index
// 				].innerHTML += `<p class="cart-p perfumer">perfumer:${item.perfumer}</p>
//           </div>`;

// 				console.log(notes_names);
// 			});

// 			for (let i = 0; i < data.length; i++) {
// 				document
// 					.querySelectorAll(".brand-name")
// 					[i].addEventListener("click", () => {
// 						searchBy("b.id", data[i].brand_id);
// 					});
// 				document
// 					.querySelectorAll(".perfumer")
// 					[i].addEventListener("click", () => {
// 						searchBy("p.perfumer", data[i].perfumer);
// 					});
// 			}

// 			let searchNotes = document.querySelectorAll(".all-notes");
// 			searchNotes.forEach((item) => {
// 				item.addEventListener("click", (e) => {
// console.log(e.target.getAttribute("value"));
// searchBy('p.all_notes', e.target.getAttribute('value'))
//         });
// 			});
// 		});
// }

// let searchBtn = document.getElementById("search-btn");
// let searchText = document.querySelector("#text-input");
// let searchAllBtn = document.querySelector("#search-all");

// searchBtn.addEventListener("click", () => {
// 	let readySearchText = searchText.value.replace(/\s/g, "-");

// 	searchBy("p.name", readySearchText);
// });
// searchAllBtn.addEventListener("click", () => {
//   searchBy("all",'',100);
// })

