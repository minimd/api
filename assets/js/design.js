//general comments
//card name
// ..item.perfume_name.replace("-", " ").length <20 ? item.perfume_name.replace("-", " ") : item.perfume_name.replace("-", " ").substring(0,18) + `...`

//headers

$(".second-nav").hide();

$("#search-input").on("click", function () {
	$("#search-input").toggleClass("toggle-border");
});

$("#search-btn").click(function (e) {
	e.preventDefault();
	$(".first-nav").hide();
	$(".second-nav").removeClass("hidden");
	$(".second-nav").fadeIn();
	$("#search-bar").val("");
});
$("#search-cancel").click(function (e) {
	e.preventDefault();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();
	$(".search-popup").fadeOut();
});
$(".search-popup").hide();
$("#search-bar").on("input", function () {
	$(".search-popup").removeClass("hidden");
	$(".search-popup").fadeIn();

	if ($(this).val() === "") {
		$(".search-popup").fadeOut();
	}
});

//black header
$('#home-nav').click(function (e) { 
	e.preventDefault();
	loadHome();
});

//carousel

let currentSlide = 0;
showSlide(currentSlide);

function showSlide(index) {
	const slides = document.querySelectorAll(".carousel-item");
	if (index >= slides.length) currentSlide = 0;
	if (index < 0) currentSlide = slides.length - 1;
	slides.forEach((slide) => slide.classList.remove("active"));
	slides[currentSlide].classList.add("active");
}

function changeSlide(n) {
	showSlide((currentSlide += n));
}

//slider

const track = document.querySelector(".brand-slider-track");

//fuck the slider

//popup stuff
$("#second-header-popup").hide();
$("#categories-nav").click(function () {
	if ($("#second-header-popup").css("display") == "none") {
		console.log("none");
	} else {
		console.log("block");
	}
	$("#second-header-popup").removeClass("hidden");
	$("#second-header-popup").fadeIn();
});
$("#second-header-popup").hover(
	function () {},
	function () {
		$("#second-header-popup").fadeOut();
	}
);
$(".header-nav").hover(
	function () {
		$("#second-header-popup").fadeOut();
	},
	function () {
		// out
	}
);

//declare variables
let newArrivalsList;
let featuredProductsList;
let notesList;
let brandsList;

//fetching the brands
//fetching the brands
fetch("http://localhost/api/get_all_brands", {}).then((response) =>
	response.json().then((data) => {
		brandsList = data;

		document.querySelector(
			".popup-results"
		).innerHTML = `<button class= 'show-all-nav' id='show-all-brands'>Show all brands</button>`;
		// re-happens if the button is clicked
		document
			.querySelector(".brands-key")
			.addEventListener("click", function (e) {
				document.querySelector(
					".popup-results"
				).innerHTML = `<button class= 'show-all-nav' id='show-all-brands'>Show all brands</button>`;
				brandsToShow.forEach((brand) => {
					document.querySelector(".popup-results").innerHTML += `
				<div class="popup-result-item" value='${brand.id}'>
					<img src="${brand.logo_url}" alt="${brand.name}" value='${brand.id}'>
				</div>`;
				});
				for (let i = 0; i < brandsToShow.length; i++) {
					document
						.querySelectorAll(".popup-result-item")
						[i].addEventListener("click", function (e) {
							console.log(e.target.getAttribute("value"));
						});
				}
			});

		// Limit the number of brands to 8
		const brandsToShow = brandsList.slice(0, 8);

		brandsToShow.forEach((brand) => {
			document.querySelector(".popup-results").innerHTML += `
            <div class="popup-result-item" value='${brand.id}'>
                <img src="${brand.logo_url}" alt="${brand.name}" value='${brand.id}'>
            </div>`;
		});
		for (let i = 0; i < brandsToShow.length; i++) {
			document
				.querySelectorAll(".popup-result-item")
				[i].addEventListener("click", function (e) {
					console.log(e.target.getAttribute("value"));
				});
		}
	})
);
fetch("http://localhost/api/get_all_notes", {}).then((response) =>
	response.json().then((data) => {
		console.log(data);

		notesList = data;

		// re-happens if the button is clicked
		document
			.querySelector(".notes-key")
			.addEventListener("click", function (e) {
				document.querySelector(
					".popup-results"
				).innerHTML = `<button class= 'show-all-nav' id='show-all-notes'>Show all notes</button>`;
				notesToShow.forEach((note) => {
					document.querySelector(".popup-results").innerHTML += `
				<div class="popup-result-item" value='${note.id}'>
					<img src="${note.note_image}" alt="${note.name}" value='${note.id}'>
				</div>`;
				});
				for (let i = 0; i < notesToShow.length; i++) {
					document
						.querySelectorAll(".popup-result-item")
						[i].addEventListener("click", function (e) {
							console.log(e.target.getAttribute("value"));
						});
				}
			});

		// Limit the number of brands to 8
		const notesToShow = notesList.slice(0, 15);

		notesToShow.forEach((note) => {
			document.querySelector(".popup-results").innerHTML += `
            <div class="popup-result-item" value='${note.id}'>
                <img src="${note.note_image}" alt="${note.name}" value='${note.id}'>
            </div>`;
		});
		for (let i = 0; i < notesToShow.length; i++) {
			document
				.querySelectorAll(".popup-result-item")
				[i].addEventListener("click", function (e) {
					console.log(e.target.getAttribute("value"));
				});
		}
	})
);

//ultimate fetch
let allPerfumes;

function loadHome()
{
	
fetch(`http://localhost/api/search/all`, {}).then((response) =>
	response.json().then((data) => {
allPerfumes = data;
		console.log(data);

		//filling lists with data from API
		newArrivalsList = data.filter(
			(item) => item.status == 4 || item.status == 2
		);
		featuredProductsList = data.filter(
			(item) => item.status == 4 || item.status == 3
		);
		// console.log(featuredProductsList);

		//clearing the containers
		document.querySelector("#first-scrollable .card-container").innerHTML = ``;

		//new arrivals
		newArrivalsList.forEach((item) => {
			document.querySelector(
				" #first-scrollable .card-container"
			).innerHTML += `<div class="card" value='${item.perfume_id}'>

            <img src="${item.perfume_image}" value='${item.perfume_id}'>
            <div class="inner-card-text" value='${item.perfume_id}'>
                <h3 value='${item.perfume_id}'>${
				item.perfume_name.replace("-", " ").length < 20
					? item.perfume_name.replace("-", " ")
					: item.perfume_name.replace("-", " ").substring(0, 18) + `...`
			}</h3>
                <div class="prices" value='${item.perfume_id}'>
                    <p class="price">${item.price}$</p>
                </div>
            </div>
            <button value='${item.perfume_id}'>View Details</button>
        </div>`;
		});
		//clearing second card container
		document.querySelector("#second-scrollable .card-container").innerHTML = ``;
		//featured products
		featuredProductsList.forEach((item) => {
			document.querySelector(
				" #second-scrollable .card-container"
			).innerHTML += `<div class="card" value='${item.perfume_id}'>
            <img src="${item.perfume_image}" alt="Product 1" value='${
				item.perfume_id
			}'>
            <div class="discount-percentage" value='${
							item.perfume_id
						}'>${Math.floor(
				((item.price - item.new_price) / item.price) * 100
			)}% </div>
            <div class="inner-card-text" value='${item.perfume_id}'>
                <h3 value='${item.perfume_id}'>${
				item.perfume_name.replace("-", " ").length < 20
					? item.perfume_name.replace("-", " ")
					: item.perfume_name.replace("-", " ").substring(0, 18) + `...`
			}</h3>
                <div class="prices" value='${item.perfume_id}'>
                    <p class="price" value='${item.perfume_id}'>${
				item.price
			}$</p>
                    <p class="discounted" value='${item.perfume_id}'>${
				item.new_price == null ? console.log("null") : item.new_price
			}$</p>
                </div>
            </div>

            <button value='${item.perfume_id}'>View Details</button>
        </div>`;
		});

		// adding event listeners to cards

		for (
			let i = 0;
			i < newArrivalsList.length + featuredProductsList.length;
			i++
		) {
			document.querySelectorAll(".card")[i].addEventListener("click", (e) => {
				singleItemShow(e.target.getAttribute("value"));
				console.log(e.target.getAttribute("value"));
			});
		}

		// Debounce function
		function debounce(func, delay) {
			let timeoutId;
			return function (...args) {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(() => func.apply(this, args), delay);
			};
		}
		// Search function
		function searchByName() {
			let searchInput = document.getElementById("search-bar").value;
			if (searchInput === "") {
				return;
			}

			console.log(searchInput);

			// Replace spaces with hyphens in the search input for English names
			let formattedInput = searchInput.toLowerCase().replace(/\s+/g, "-");

			let searchBarResults = data
				.filter((item) => {
					const englishName = item.perfume_name
						? item.perfume_name.toLowerCase()
						: "";
					const arabicName = item.perfume_arabic_name || "";

					return (
						englishName.includes(formattedInput) ||
						arabicName.includes(searchInput)
					);
				})
				.slice(0, 6); // This limits the results to a maximum of 6 items

			if (searchBarResults.length > 0) {
				console.log(searchBarResults);
			} else {
				console.log("No results found.");
			}

			// Here you can add code to display the search results

			document.querySelector(".search-popup-container").innerHTML = ``;
			searchBarResults.forEach((item) => {
				document.querySelector(".search-popup-container").innerHTML += `
		<div class="search-item" value='${item.perfume_id}'>
          <img src="${item.perfume_image}" alt="" value='${item.perfume_id}'>
          <div class="search-item-text" value='${item.perfume_id}'>
            <p class="english" value='${item.perfume_id}'>${
					item.perfume_name.replace("-", " ").length < 11
						? item.perfume_name.replace("-", " ")
						: item.perfume_name.replace("-", " ").substring(0, 9) + `...`
				} </p>
            <p class="arabic" value='${item.perfume_id}'>${
					item.perfume_name.replace("-", " ").length < 11
						? item.perfume_arabic_name.replace("-", " ")
						: item.perfume_arabic_name.replace("-", " ").substring(0, 9) + `...`
				}</p>
          </div>
        </div>
		`;
			});
			// Add event listener to the search items
			document.querySelectorAll(".search-item").forEach((item) => {
				item.addEventListener("click", (e) => {
					e.preventDefault();
					console.log(e.target.getAttribute("value"));
				});
			});
		}

		// Create a debounced version of the search function
		const debouncedSearch = debounce(searchByName, 400);

		// Add event listener to the search input
		$("#search-bar").on("input", debouncedSearch);

		//here you code end

		// singleItemShow(1); // replace with your perfume id
	})
);
}
loadHome();

function singleItemShow(perfumeId) {
    // Find the selected perfume from the data array
    const selectedPerfume = allPerfumes.find(item => item.perfume_id == perfumeId);

    if (selectedPerfume) {
        let sizeOptions = `<select id="size-select">
            <option value="1">Size: ${selectedPerfume.size || 'Default'} - $${selectedPerfume.price}</option>`;
        
        if (selectedPerfume.size_2nd) {
            sizeOptions += `<option value="2">Size: ${selectedPerfume.size_2nd} - $${selectedPerfume.price_2nd}</option>`;
        }
        
        sizeOptions += `</select>`;

        // Replace hyphens with spaces in perfume name
        const formattedPerfumeName = selectedPerfume.perfume_name.replace(/-/g, ' ');

        document.querySelector(".all").innerHTML = `
            <div class='single-item-container'>
                <div class='single-item-container-row'>
                    <div class='single-image'>
                        <img src="${selectedPerfume.perfume_image}" alt="${formattedPerfumeName}">
                    </div>
                    <div class='single-item-details'>
                        <h2>${formattedPerfumeName}</h2>
                        <h3>${selectedPerfume.brand_name}</h3>
                        <p class="brand">Brand: ${selectedPerfume.brand_name}</p>
                        <p>Perfumer: ${selectedPerfume.perfumer}</p>
                        ${sizeOptions}
                        <p class="price">Price: $${selectedPerfume.price}</p>
                        ${selectedPerfume.new_price ? `<p class="discounted-price">Discounted Price: $${selectedPerfume.new_price}</p>` : ''}
                        <div class="quantity-container">
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" name="quantity" min="1" value="1">
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                <div class="notes-section">
                    <h4>Fragrance Notes</h4>
                    <div class="notes-container">
                        <div class="note-category">
                            <h5>Top Notes</h5>
                            <p>${selectedPerfume.top_note_names || 'N/A'}</p>
                        </div>
                        <div class="note-category">
                            <h5>Middle Notes</h5>
                            <p>${selectedPerfume.middle_note_names || 'N/A'}</p>
                        </div>
                        <div class="note-category">
                            <h5>Base Notes</h5>
                            <p>${selectedPerfume.base_note_names || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                <div class="description">
                    <h4>Description</h4>
                    <p>${selectedPerfume.description}</p>
                </div>
            </div>
        `;

        // Add event listener for the "Add to Cart" button
        document.querySelector(".add-to-cart").addEventListener("click", function() {
            const quantity = document.getElementById("quantity").value;
            const sizeSelect = document.getElementById("size-select");
            const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].text;
            
            // Here you would typically add the item to the cart
            // For this example, we'll just show a popup
            showCartPopup(formattedPerfumeName, selectedSize, quantity);
        });

        // Add event listener for size selection
        document.getElementById("size-select").addEventListener("change", function(e) {
            const priceElement = document.querySelector(".price");
            const discountedPriceElement = document.querySelector(".discounted-price");
            
            if (e.target.value === "1") {
                priceElement.textContent = `Price: $${selectedPerfume.price}`;
                if (selectedPerfume.new_price) {
                    discountedPriceElement.textContent = `Discounted Price: $${selectedPerfume.new_price}`;
                }
            } else if (e.target.value === "2") {
                priceElement.textContent = `Price: $${selectedPerfume.price_2nd}`;
                if (selectedPerfume.new_price_2nd) {
                    discountedPriceElement.textContent = `Discounted Price: $${selectedPerfume.new_price_2nd}`;
                }
            }
        });
    }
}

function showCartPopup(perfumeName, size, quantity) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.textContent = `Added to cart: ${quantity} x ${perfumeName} (${size})`;
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "block";

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = "none";
        document.body.removeChild(popup);
    }, 3000);
}