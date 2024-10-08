//general comments
//card name
// ..item.perfume_name.replace("-", " ").length <20 ? item.perfume_name.replace("-", " ") : item.perfume_name.replace("-", " ").substring(0,18) + `...`

//headers

$(".second-nav").hide();

$("#search-input").on("click", function () {
	$("#search-input").toggleClass("toggle-border");
});

$("#search-btn").click(function (e) {
	// e.preventDefault();
	$(".first-nav").hide();
	$(".second-nav").removeClass("hidden");
	$(".second-nav").fadeIn();
	$("#search-bar").val("");
	$("#search-bar").focus();
});
$(".for-arabic").click(function (e) {
	// e.preventDefault();
	window.location.href = "ar";
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
$("#home-nav").click(function (e) {
	e.preventDefault();
	const stateObject = { section: "main" };
	window.history.pushState(stateObject, "", "main");
	loadHome();
	// window.location.reload();
});
$("h1").click(function (e) {
	e.preventDefault();
	const stateObject = { section: "main" };
	window.history.pushState(stateObject, "", "main");
	loadHome();
	// window.location.reload();
});
$("p#cart").click(function (e) {
	const stateObject = { section: "cart" };
	window.history.pushState(stateObject, "", "cart");
	showCartScreen();
});
$("#cart-div img").click(function (e) {
	const stateObject = { section: "cart" };
	window.history.pushState(stateObject, "", "cart");
	showCartScreen();
});

//carousel

let currentSlide = 0;

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

//fuck the slider

//popup stuff
$("#second-header-popup").hide();
$("#categories-nav").click(function () {
	if ($("#second-header-popup").css("display") == "none") {
	} else {
		
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
//mens
$(".men-key").click(function (e) {
	const stateObject = { section: "men" };
	window.history.pushState(stateObject, "", "men-perfumes");
	showMenPerfumesScreen();
});
$(".women-key").click(function (e) {
	const stateObject = { section: "women" };
	window.history.pushState(stateObject, "", "women-perfumes");
	showWomenPerfumesScreen();
});
$(".unisex-key").click(function (e) {
	const stateObject = { section: "unisex" };
	window.history.pushState(stateObject, "", "unisex-perfumes");
	showUnisexPerfumesScreen();
});
$(".testers-key").click(function (e) {
	const stateObject = { section: "testers" };
	window.history.pushState(stateObject, "", "testers");
	showTestersPerfumesScreen();
});
$(".unboxed-key").click(function (e) {
	const stateObject = { section: "unboxed" };
	window.history.pushState(stateObject, "", "unboxed");
	showUnboxedPerfumesScreen();
});
$(".rares-key").click(function (e) {
	const stateObject = { section: "rares" };
	window.history.pushState(stateObject, "", "rare-perfumes");
	showRarePerfumesScreen();
});
$("#new-arrivals-nav").click(function (e) {
	const stateObject = { section: "new arrival" };
	window.history.pushState(stateObject, "", "new-arrival");
	showNewArrivalsScreen();
});
$("#best-sellers-nav").click(function (e) {
	const stateObject = { section: "best-sellers" };
	window.history.pushState(stateObject, "", "on-sale");
	showOnSalePerfumesScreen();
});
$("#all-perfumes-nav").click(function (e) {
	const stateObject = { section: "all-perfumes" };
	window.history.pushState(stateObject, "", "all-perfumes");
	showAllPerfumesScreen();
});

//declare variables
let newArrivalsList;
let featuredProductsList;
let notesList;
let brandsList;
let searchBarResults;

//fetching the brands
//fetching the brands

//ultimate fetch
let allPerfumes;

function loadHome() {
	fetch(`http://localhost/api/search/all`, {}).then((response) =>
		response.json().then((data) => {
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
										const stateObject = {
											section: "brand",
											param: e.target.getAttribute("value"),
										};


										window.history.pushState(stateObject, "", "brand");
										searchByBrandScreen(e.target.getAttribute("value"));
									});
							}
							$("#show-all-brands").click(function (e) {
								const stateObject = { section: "brands" };
								window.history.pushState(stateObject, "", "all-brands");
								showAllBrandsScreen();
							});
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
								const stateObject = {
									section: "brand",
									param: e.target.getAttribute("value"),
								};

								
								window.history.pushState(stateObject, "", "brand");
								searchByBrandScreen(e.target.getAttribute("value"));
							});
					}
					$("#show-all-brands").click(function (e) {
						const stateObject = { section: "brands" };
						window.history.pushState(stateObject, "", "all-brands");
						e.preventDefault();
						showAllBrandsScreen();
					});
				})
			);
			fetch("http://localhost/api/get_all_notes", {}).then((response) =>
				response.json().then((data) => {
					// console.log(data);

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
					<img src="${note.note_image}" alt="${note.name}" value='${note.name}'>
					<span value='${note.name}'>${note.name}</span>
				</div>`;
							});
							for (let i = 0; i < notesToShow.length; i++) {
								document
									.querySelectorAll(".popup-result-item")
									[i].addEventListener("click", function (e) {
										const stateObject = {
											section: "note",
											param: e.target.getAttribute("value"),
										};

										
										window.history.pushState(stateObject, "", "note");
										showPerfumesByNote(e.target.getAttribute("value"));
									});
							}

							$("#show-all-notes").click(function (e) {
								const stateObject = { section: "notes" };
								window.history.pushState(stateObject, "", "all-notes");
								e.preventDefault();
								showAllNotesScreen();
							});
						});

					// Limit the number of brands to 8
					const notesToShow = notesList.slice(0, 14);
					const mainScreenNotes = notesToShow.slice(0, 4);
					mainScreenNotes.forEach((note, i) => {

						document.querySelectorAll(".main-note")[
							i
						].innerHTML = `<img src="${note.note_image}" alt="Product 1" class="" value='${note.name}'>
							
					        <div class="inner-card-text">
					            <h3 value='${note.name}'>${note.name}</h3>
								
					        </div>
			
					        <button value='${note.name}'>view perfumes</button>`;
					});
					for (let i = 0; i < mainScreenNotes.length; i++) {
						document
							.querySelectorAll(".main-note button")
							[i].addEventListener("click", function (e) {
								const stateObject = {
									section: "note",
									param: e.target.getAttribute("value"),
								};

								
								window.history.pushState(stateObject, "", "note");
								showPerfumesByNote(e.target.getAttribute("value"));
							});
					}
				})
			);
			allPerfumes = data;
			

			//
			//
			//
			//
			$(".all").html(`
    <div class="carousel">
        <div class="carousel-item active">
            <img src="http://localhost/api/assets/images/carousel-1.webp" alt="Image 1">
            <div class="carousel-caption">
                <h2>First Slide Title</h2>
                <p>This is a description for the first slide.</p>
                <!-- <a href="#" class="carousel-btn">Learn More</a> -->
            </div>
        </div>
        <div class="carousel-item">
            <img src="http://localhost/api/assets/images/carousel2-.jpg" alt="Image 2">
            <div class="carousel-caption">
                <h2>Second Slide Title</h2>
                <p>This is a description for the second slide.</p>
                <!-- <a href="#" class="carousel-btn">Discover More</a> -->
            </div>
        </div>
        <div class="carousel-item">
            <img src="http://localhost/api/assets/images/carousel-3.webp" alt="Image 3">
            <div class="carousel-caption">
                <h2>Third Slide Title</h2>
                <p>This is a description for the third slide.</p>
                <!-- <a href="#" class="carousel-btn">Explore More</a> -->
            </div>
        </div>
        <a class="prev" onclick="changeSlide(-1)">❮</a>
        <a class="next" onclick="changeSlide(1)">❯</a>
    </div>


    <!-- carousel ends here -->
    <!-- slider starts here -->
    <div class="brand-slider">
        <div class="brand-slider-track">
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/chanel-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/amouage-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/clive-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/frederic-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/initio-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/Xerjoff-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/chanel-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/amouage-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/clive-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/frederic-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/initio-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/Xerjoff-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/chanel-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/amouage-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/clive-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/frederic-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/initio-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/Xerjoff-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/chanel-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/amouage-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/clive-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/frederic-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/initio-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/Xerjoff-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/chanel-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/amouage-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/clive-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/frederic-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/initio-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/Xerjoff-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/chanel-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/amouage-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/dior-logo.svg" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/clive-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/frederic-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/initio-logo.png" alt="Brand 1"></div>
            <div class="brand-slide"><img src="http://localhost/api/assets/brands/Xerjoff-logo.png" alt="Brand 1"></div>
            



        </div>
    </div>

    <!-- slider ends here -->


    <!-- Horizontally Scrollable Cards Section -->
    <div class="section-title">
        <h3 class="slider-title">new arrivals</h3>
    </div>

    <section class="scrollable-cards" id="first-scrollable">

        <div class="card-container">
            <div class="card">

                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                    </div>
                </div>
                <button>View Details</button>
            </div>
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <!-- Add more cards as needed -->
        </div>
    </section>
    <!-- Horizontally Scrollable Cards Section -->
    <div class="section-title">
        <h3 class="slider-title">on sale</h3>
    </div>

    <section class="scrollable-cards" id="second-scrollable">

        <div class="card-container">
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="discount-percentage">25% </div>
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                        <p class="discounted">30$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="discount-percentage">25% </div>
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                        <p class="discounted">30$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="discount-percentage">25% </div>
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                        <p class="discounted">30$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                <div class="discount-percentage">25% </div>
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                        <p class="price">40$</p>
                        <p class="discounted">30$</p>
                    </div>
                </div>

                <button>View Details</button>
            </div>

            <!-- Add more cards as needed -->
        </div>
    </section>
    <div class="section-title">
        <h3 class="slider-title">amazing notes</h3>
    </div>
    <section class="scrollable-cards" id="third-scrollable">

        <div class="card-container">
            <div class="card main-note">
                
            </div>
            <div class="card main-note">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                      
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card main-note">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
               
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                    
                    </div>
                </div>

                <button>View Details</button>
            </div>
            <div class="card main-note">
                <img src="http://localhost/api/assets/perfumes/test-perfume.webp" alt="Product 1">
                
                <div class="inner-card-text">
                    <h3>Product 1</h3>
                    <div class="prices">
                      
                    </div>
                </div>

                <button>View Details</button>
            </div>

            <!-- Add more cards as needed -->
        </div>
    </section>
    <section id="" class="artist">
        <div class="artist-image"><img src="http://localhost/api/assets/images/artist.jpeg" alt=""></div>

        <div class="artist-quote">
            <h2 id="" class="artist">
            Quentin Bisch
            </h2>
            <h3>
            Bisch is known for his bold and creative use of accords, and his ability to adapt his style to fit the brand he is working with. He has been called a "star perfumer" and is highly sought after in the industry. In an interview, Bisch discussed his passion for perfumery and the pressure and expectations that come with being a successful perfumer. He described himself as a perfectionist who is always seeking to achieve more and is constantly creating perfumes in his mind.
            </h3>
        </div>
    </section>
    <section id="" class="artist right">
        <div class="artist-image"><img src="http://localhost/api/assets/images/original.jpeg" alt="" class="r80"></div>

        <div class="artist-quote">
            <h2 id="" class="artist">
            Kurkdjian
            </h2>
            <h3>In 2009, Kurkdjian co-founded Maison Francis Kurkdjian with Marc Chaya. The Maison represents a blend of traditional French perfumery and modern innovation, offering a "fragrance wardrobe" that allows individuals to express their personalities through scent. His notable creations for  his eponymous Maison include Baccarat Rouge 540 and Aqua Universalis.
            </h3>
        </div>
    </section>
    <section id="" class="artist">
        <div class="artist-image"><img src="http://localhost/api/assets/images/amouage.png" alt=""></div>

        <div class="artist-quote">
            <h2 id="" class="artist">
            AMOUAGE LYRIC 
            </h2>
            <h3>thought that lyric was not for me, I found it suffocating, lacking in breath...until today.
June 13, 6 pm, 23 degrees Celsius, the fiery rays of the sun penetrate the lake water but the rain from the past night raises a cool evening breeze, the perfect climate for lyric. A warm, velvety rose under the sun is suddenly refreshed by a splash of citrus. The soil beneath it, moist and fertile, allows green buds to bloom.
Elegant, sweet but energetic..as a true man should be. I truly understand the reason for identifying it as a male fragrance.

There are no failed creations by Chong, they simply reveal themselves with time.
            
            </h3>
        </div>
    </section>
    <section id="" class="artist right">
        <div class="artist-image"><img src="http://localhost/api/assets/images/flower.jpg" alt="" class="r80"></div>

        <div class="artist-quote">
            <h2 id="" class="artist">
            Lincoln Rose
            </h2>
            <h3>the king of flowers, lemony fresh with various nuances of powder, wood notes or fruit, feminine, clean, intensely romantic
            </h3>
        </div>
    </section>`);
			showSlide(currentSlide);
			//filling lists with data from API
			newArrivalsList = data.filter(
				(item) => item.status == 4 || item.status == 2
			);
			featuredProductsList = data.filter(
				(item) => item.status == 4 || item.status == 3
			);
			// console.log(featuredProductsList);

			// clearing the containers
			document.querySelector(
				"#first-scrollable .card-container"
			).innerHTML = ``;

			//new arrivals
			newArrivalsList.slice(0, 4).forEach((item) => {
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
			document.querySelector(
				"#second-scrollable .card-container"
			).innerHTML = ``;
			//featured products
			featuredProductsList.slice(0, 4).forEach((item) => {
				document.querySelector(
					" #second-scrollable .card-container"
				).innerHTML += `<div class="card" value='${item.perfume_id}'>
			    <img src="${item.perfume_image}" alt="Product 1" value='${item.perfume_id}'>
			    <div class="discount-percentage" value='${item.perfume_id}'>${Math.floor(
					((item.price - item.new_price) / item.price) * 100
				)}% </div>
			    <div class="inner-card-text" value='${item.perfume_id}'>
			        <h3 value='${item.perfume_id}'>${
					item.perfume_name.replace("-", " ").length < 20
						? item.perfume_name.replace("-", " ")
						: item.perfume_name.replace("-", " ").substring(0, 18) + `...`
				}</h3>
			        <div class="prices" value='${item.perfume_id}'>
			            <p class="price" value='${item.perfume_id}'>${item.price}$</p>
			            <p class="discounted" value='${item.perfume_id}'>${
					item.new_price == null ? console.log("") : item.new_price
				}$</p>
			        </div>
			    </div>

			    <button value='${item.perfume_id}'>View Details</button>
			</div>`;
			});

			// adding event listeners to cards

			for (
				let i = 0;
				i <
				newArrivalsList.slice(0, 4).length +
					featuredProductsList.slice(0, 4).length;
				i++
			) {
				document.querySelectorAll(".card")[i].addEventListener("click", (e) => {
					singleItemShow(e.target.getAttribute("value"));
					const stateObject = {
						section: "single",
						param: e.target.getAttribute("value"),
					};

					window.history.pushState(stateObject, "", "item");
					
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
				document.querySelector(".search-popup-container").innerHTML = "";

				let searchInput = document.getElementById("search-bar").value;
				if (searchInput === "") {
					return;
				}


				// Replace spaces with hyphens in the search input for English names
				let formattedInput = searchInput.toLowerCase().replace(/\s+/g, "-");

				searchBarResults = data.filter((item) => {
					const englishName = item.perfume_name
						? item.perfume_name.toLowerCase()
						: "";
					const arabicName = item.perfume_arabic_name || "";

					return (
						englishName.includes(formattedInput) ||
						arabicName.includes(searchInput)
					);
				}); // This limits the results to a maximum of 6 items
				let miniSearchItems = searchBarResults.slice(0, 9);
			

				// Here you can add code to display the search results

				miniSearchItems.forEach((item) => {
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
							: item.perfume_arabic_name
							? item.perfume_arabic_name.replace("-", " ").substring(0, 9) +
							  `...`
							: ``
					}</p>
          </div>
        </div>
		`;
				});
				document.querySelector(
					".search-popup-container"
				).innerHTML += `<div class='margined'><button class= 'show-all-nav' id='show-all-search'>Show all searches</button><div>`;

				$("#show-all-search").click(function (e) {
					e.preventDefault();

					searchNameScreen(
						document
							.getElementById("search-bar")
							.value.toLowerCase()
							.replace(/\s+/g, "-")
					);
				});
				// Add event listener to the search items
				document.querySelectorAll(".search-item").forEach((item) => {
					item.addEventListener("click", (e) => {
						const stateObject = {
							section: "single",
							param: e.target.getAttribute("value"),
						};

						
						window.history.pushState(stateObject, "", "item");
						e.preventDefault();
						singleItemShow(e.target.getAttribute("value"));

						e.preventDefault();
						$(".second-nav").hide();
						$(".first-nav").fadeIn();
						$(".search-popup").fadeOut();

					});
				});
			}

			// Create a debounced version of the search function
			const debouncedSearch = debounce(searchByName, 400);

			// Add event listener to the search input
			$("#search-bar").on("input", debouncedSearch);

			//here you code end
		})
	);
}
loadHome();
function findSimilarPerfumes(selectedPerfume, allPerfumes) {
	const selectedNotes = (selectedPerfume.all_note_names || "")
		.toLowerCase()
		.split(",");

	return allPerfumes
		.filter((perfume) => perfume.perfume_id !== selectedPerfume.perfume_id)
		.map((perfume) => {
			const perfumeNotes = (perfume.all_note_names || "")
				.toLowerCase()
				.split(",");
			const commonNotes = selectedNotes.filter((note) =>
				perfumeNotes.includes(note)
			);
			return { ...perfume, similarity: commonNotes.length };
		})
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, 3);
}

function singleItemShow(perfumeId) {
	// Find the selected perfume from the data array
	const selectedPerfume = allPerfumes.find(
		(item) => item.perfume_id == perfumeId
	);

	if (selectedPerfume) {
		const similarPerfumes = findSimilarPerfumes(selectedPerfume, allPerfumes);
		let similarPerfumesHtml = `
            <div class="similar-perfumes-section">
                <h4>Similar Perfumes</h4>
                <div class="similar-perfumes-container">
        `;

		similarPerfumes.forEach((perfume) => {
			similarPerfumesHtml += `
                <div class="perfume-card" data-id="${perfume.perfume_id}">
                    <img src="${perfume.perfume_image}" alt="${
				perfume.perfume_name
			}">
                    <h3>${perfume.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${perfume.brand_name}</p>
                    <p>Price: $${perfume.price}</p>
                    ${
											perfume.new_price
												? `<p class="sale-price">$${perfume.new_price}</p>`
												: ""
										}
                    <button class="view-details">view more</button>
                </div>
            `;
		});

		similarPerfumesHtml += `
                </div>
            </div>
        `;
		let sizeButtons = `<div id="size-buttons" class="size-buttons">`;
if (selectedPerfume.state !== "5") {
	sizeButtons += `<button class="size-btn active" data-size="1" data-price="${
		selectedPerfume.new_price || selectedPerfume.price
	}"> ${selectedPerfume.size || "Default"} </button>`;

	if (selectedPerfume.size_2nd) {
		sizeButtons += `<button class="size-btn" data-size="2" data-price="${
			selectedPerfume.new_price_2nd || selectedPerfume.price_2nd
		}"> ${selectedPerfume.size_2nd} </button>`;
	}
	else {
		sizedfButton += " <h3>out of stock</h3>";
	}

		}
		
sizeButtons += `</div>`;
		const formattedPerfumeName = selectedPerfume.perfume_name.replace(
			/-/g,
			" "
		);

		document.querySelector(".all").innerHTML = `
            <div class='single-item-container'>
                
                <div class='single-image'>
                    <img src="${
											selectedPerfume.perfume_image
										}" alt="${formattedPerfumeName}">
                </div>
                <div class='content'>
                    <div class='single-item-details'>
					<p class='fairuz'>By Fairuz</p>
                        <h2>${formattedPerfumeName}</h2>
                        <h3>${selectedPerfume.brand_name}</h3>
                        <p> ${selectedPerfume.perfumer.replace("-", " ")}</p>
                        ${sizeButtons}
						<div class = 'prices-show'>
                        <p class="price ${
													selectedPerfume.new_price ? "cancelled-text" : false
												}" id="original-price"> $${selectedPerfume.price}</p>
                        ${
													selectedPerfume.new_price
														? `<p class="discounted-price"> $${selectedPerfume.new_price}</p>`
														: ""
												}
						</div>
                        <div class="quantity-container">
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" name="quantity" min="1" value="1">
                        </div>
                        <div class="buy-buttons">
                            <button class="add-to-cart">Add to Cart</button>
                            <button class="buy-now">buy now</button>
                        </div>
						<div class="notes-section">
                    <h4>Fragrance Notes</h4>
					<div class='line'></div>
                    <div class="notes-container">
                        <div class="note-category">
                            <h5>Top Notes</h5>
                            <p>${selectedPerfume.top_note_names || "N/A"}</p>
                        </div>
                        <div class="note-category">
                            <h5>Middle Notes</h5>
                            <p>${selectedPerfume.middle_note_names || "N/A"}</p>
                        </div>
                        <div class="note-category">
                            <h5>Base Notes</h5>
                            <p>${selectedPerfume.base_note_names || "N/A"}</p>
                        </div>
                        <div class="note-category">
                            <h5>feels like :</h5>
                            <p>${selectedPerfume.tag || "N/A"}</p>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
                <div class='line description-line'></div>
                <div class="description">
                    <h4>Description</h4>
                    <p>${selectedPerfume.description} this item is ${
			selectedPerfume.box == "0"
				? "new."
				: selectedPerfume.box == "1"
				? "a tester"
				: selectedPerfume.box == "2"
				? "unboxed"
				: selectedPerfume.box == "3"
				? "rare"
				: null
		}</p>
                </div>
				<div class='line similar-perfumes-line'></div>
                ${similarPerfumesHtml}
            </div>
        `;
		// animations and stuff
		$(".single-image").hide();
		$(".single-item-details h2").hide();
		$(".single-item-details h3").hide();
		$(".single-item-details p").hide();
		$(".single-item-details .brand").hide();
		$(".size-btn").hide();
		$(".single-item-details .price").hide();
		$(".single-item-details .discounted-price").hide();
		$(".quantity-container").hide();
		$(".add-to-cart").hide();
		$(".buy-now").hide();
		$(".notes-section").hide();
		$(".description-line").hide();
		$(".description h4").hide();
		$(".description p").hide();
		$(".similar-perfumes-line").hide();
		$(".similar-perfumes-section").hide();

		setTimeout(function () {
			$(".single-image").fadeIn();
		}, 300);
		setTimeout(function () {
			$(".single-item-details h2").fadeIn(400);
		}, 500);
		setTimeout(function () {
			$(".single-item-details h3").fadeIn(500);
		}, 650);
		setTimeout(function () {
			$(".single-item-details p").fadeIn(500);
		}, 650);
		setTimeout(function () {
			$(".single-item-details p").fadeIn(800);
		}, 700);
		setTimeout(function () {
			$(".single-item-details .brand").fadeIn(600);
		}, 800);
		setTimeout(function () {
			$(".size-btn").fadeIn(600);
		}, 850);

		setTimeout(function () {
			$(".single-item-details .price").fadeIn(750);
		}, 1000);
		setTimeout(function () {
			$(".single-item-details .discounted-price").fadeIn(750);
		}, 1000);
		setTimeout(function () {
			$(".quantity-container").fadeIn(850);
		}, 1150);
		setTimeout(function () {
			$(".add-to-cart").fadeIn(650);
		}, 1250);
		setTimeout(function () {
			$(".buy-now").fadeIn(1400);
		}, 1250);
		setTimeout(function () {
			$(".notes-section").fadeIn(2400);
		}, 1500);
		setTimeout(function () {
			$(".description-line").fadeIn(1800);
		}, 3000);
		setTimeout(function () {
			$(".description h4").fadeIn(1800);
		}, 3000);
		setTimeout(function () {
			$(".description p").fadeIn(2000);
		}, 3300);
		setTimeout(function () {
			$(".similar-perfumes-line").fadeIn(1800);
		}, 3500);
		setTimeout(function () {
			$(".similar-perfumes-section").fadeIn(2000);
		}, 3800);

		document.querySelectorAll(".size-btn").forEach((button) => {
			button.addEventListener("click", function () {
				// Remove active class from all buttons
				document
					.querySelectorAll(".size-btn")
					.forEach((btn) => btn.classList.remove("active"));
				// Add active class to the clicked button
				this.classList.add("active");

				// Get the selected size and price
				const selectedSize = this.getAttribute("data-size");
				const selectedPrice = this.getAttribute("data-price");

				// Update the original price only if there is no discount price
				const originalPriceElement = document.querySelector("#original-price");
				const discountedPriceElement =
					document.querySelector(".discounted-price");

				// Check if the selected size has a discounted price
				if (selectedSize === "1") {
					originalPriceElement.textContent = `$${selectedPerfume.price}`;
					if (discountedPriceElement) {
						discountedPriceElement.textContent = `$${selectedPerfume.new_price}`;
					}
				} else if (selectedSize === "2") {
					originalPriceElement.textContent = `$${selectedPerfume.price_2nd}`;
					if (discountedPriceElement && selectedPerfume.new_price_2nd) {
						discountedPriceElement.textContent = `$${selectedPerfume.new_price_2nd}`;
					} else if (discountedPriceElement) {
						discountedPriceElement.textContent = ``;
					}
				}
			});
		});
		//event listener for the "similar perfumes" button
		document
			.querySelectorAll(".similar-perfumes-container .view-details")
			.forEach((button) => {
				button.addEventListener("click", function () {
					const perfumeId = this.closest(".perfume-card").dataset.id;
					const stateObject = {
						section: "single",
						param: perfumeId,
					};
					

					window.history.pushState(stateObject, "", "item");
					singleItemShow(perfumeId);
				});
			});

		// Add event listener for the "Add to Cart" button
		document
			.querySelector(".add-to-cart")
			.addEventListener("click", function () {
				const quantity = document.getElementById("quantity").value;
				const activeButton = document.querySelector(".size-btn.active");
				const selectedSize = activeButton.textContent;
				const price = activeButton.getAttribute("data-price");

				// Call addToCart to store the item in localStorage
				addToCart(
					selectedPerfume.perfume_id,
					formattedPerfumeName,
					selectedSize,
					quantity,
					price,
					selectedPerfume.perfume_image
				);

				// Show cart popup for feedback to the user
				showCartPopup(
					formattedPerfumeName,
					selectedSize + " $",
					quantity,
					price
				);
			});

		// Add event listener for the "Buy Now" button
		document.querySelector(".buy-now").addEventListener("click", function () {
			const quantity = document.getElementById("quantity").value;
			const activeButton = document.querySelector(".size-btn.active");
			const selectedSize = activeButton.textContent;
			const price = activeButton.getAttribute("data-price");

			// Call addToCart to store the item in localStorage
			addToCart(
				selectedPerfume.perfume_id,
				formattedPerfumeName,
				selectedSize,
				quantity,
				price,
				selectedPerfume.perfume_image
			);

			// Show cart popup for feedback to the user
			showCartPopup(formattedPerfumeName, selectedSize + " $", quantity, price);
			const stateObject = {
				section: "cart",
			};

			
			window.history.pushState(stateObject, "", "cart");
			showCartScreen();
		});
	}
}
function addToCart(perfumeId, perfumeName, size, quantity, price, img) {
	// Get the current cart from localStorage or initialize an empty array if it doesn't exist
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	// Check if the item already exists in the cart
	const existingItemIndex = cart.findIndex(
		(item) => item.perfumeId === perfumeId && item.size === size
	);

	if (existingItemIndex > -1) {
		// If the item already exists in the cart, update the quantity
		cart[existingItemIndex].quantity =
			parseInt(cart[existingItemIndex].quantity) + parseInt(quantity);
	} else {
		// If the item does not exist, add a new item to the cart
		cart.push({
			perfumeId: perfumeId,
			perfumeName: perfumeName,
			size: size,
			quantity: quantity,
			price: price,
			img: img,
		});
	}

	// Save the updated cart back to localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
}

function showCartPopup(perfumeName, size, quantity, price) {
	const popup = document.createElement("div");
	popup.className = "cart-popup";
	popup.textContent = `Added to cart: ${quantity} x ${perfumeName} (${size}) perfume price is ${price}$`;
	document.body.appendChild(popup);

	// Show the popup
	popup.style.display = "block";

	// Hide the popup after 3 seconds
	setTimeout(() => {
		popup.style.display = "none";
		document.body.removeChild(popup);
	}, 3000);
}
let previousScreen;
function searchNameScreen(term) {
	previousScreen = term;
	clearDOM();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
		<div class="search-controls">
			<div class="sort-controls">
				<label for="sort-select">Sort by:</label>
				<select id="sort-select">
					<option value="name-asc">Name (A-Z)</option>
					<option value="name-desc">Name (Z-A)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">Min Price:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">Max Price:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">Apply Filter</button>
			
			</div>
		</div>
		<div id="search-results" class="search-results-grid"></div>
	`;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
				<div class="perfume-card" data-id="${item.perfume_id}">
					<img src="${item.perfume_image}" alt="${item.perfume_name}">
					<h3>${item.perfume_name.replace(/-/g, " ")}</h3>
					<p>Brand: ${item.brand_name}</p>
					<p>Price: $${item.price}</p>
					${item.new_price ? `<p class="sale-price">Sale: $${item.new_price}</p>` : ""}
					<button class="view-details">View Details</button>
				</div>
			`;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;

				const stateObject = {
					section: "single",
					param: perfumeId,
				};
				

				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(searchBarResults);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...searchBarResults];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = searchBarResults.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}

function clearDOM() {
	document.querySelector(".all").innerHTML = ``;
}

function searchByBrandScreen(brandId) {
	$("#second-header-popup").fadeOut();
	previousScreen = brandId;
	clearDOM();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
		<div class="search-controls">
			<div class="sort-controls">
				<label for="sort-select">Sort by:</label>
				<select id="sort-select">
					<option value="name-asc">Name (A-Z)</option>
					<option value="name-desc">Name (Z-A)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">Min Price:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">Max Price:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">Apply Filter</button>
				
			</div>
		</div>
		<div id="search-results" class="search-results-grid"></div>
	`;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes by brand
	const brandResults = allPerfumes.filter((item) => item.brand_id == brandId);

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
				<div class="perfume-card" data-id="${item.perfume_id}">
					<img src="${item.perfume_image}" alt="${item.perfume_name}">
					<h3>${item.perfume_name.replace(/-/g, " ")}</h3>
					<p>Brand: ${item.brand_name}</p>
					<p>Price: $${item.price}</p>
					${item.new_price ? `<p class="sale-price">Sale: $${item.new_price}</p>` : ""}
					<button class="view-details">View Details</button>
				</div>
			`;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				// Create the button element
				const stateObject = {
					section: "single",
					param: perfumeId,
				};
				

				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(brandResults);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...brandResults];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = brandResults.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showAllBrandsScreen() {
	previousScreen = "allBrands";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Add the back button

	document.querySelector(".all").innerHTML = `
        <div class="search-results-grid" id="all-brands-container"></div>
    `;

	brandsList.forEach((brand) => {
		document.querySelector("#all-brands-container").innerHTML += `
            <div class="perfume-card" data-id="${brand.id}">
                <img src="${brand.logo_url}" alt="${brand.name}">
                <h3>${
									brand.name.length < 20
										? brand.name
										: brand.name.substring(0, 18) + "..."
								}</h3>
                <p>Brand ID: ${brand.id}</p>
                <button class="view-details">View Brand</button>
            </div>
        `;
	});

	// Add event listeners to the brand cards
	document
		.querySelectorAll("#all-brands-container .perfume-card")
		.forEach((card) => {
			card.addEventListener("click", function (e) {
				const stateObject = {
					section: "brand",
					param: this.dataset.id,
				};

				
				window.history.pushState(stateObject, "", "brand");
				searchByBrandScreen(this.dataset.id);
			});
		});
}
function showPerfumesByNote(noteName) {
	clearDOM();
	previousScreen = "noteSearch";
	$("#second-header-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	const filteredPerfumes = allPerfumes.filter(
		(perfume) =>
			perfume.all_note_names &&
			perfume.all_note_names.toLowerCase().includes(noteName.toLowerCase())
	);

	const container = document.createElement("div");
	container.className = "search-results-container";

	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
				<h3> note :${noteName}</h3>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((perfume) => {
			searchResultsElement.appendChild(createPerfumeCard(perfume));
		});
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	renderSearchResults(filteredPerfumes);

	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...filteredPerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = filteredPerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}

function createPerfumeCard(perfume) {
	let card = document.createElement("div");
	card.className = "perfume-card";
	card.innerHTML = `
		<img src="${perfume.perfume_image}" alt="${perfume.perfume_name}">
		<h3>${perfume.perfume_name.replace("-", " ")}</h3>
		<p>${perfume.brand_name}</p>
		<p>Price: $${perfume.price}</p>
		${
			perfume.new_price
				? `<p class="sale-price">Sale: $${perfume.new_price}</p>`
				: ""
		}
		<button class="view-details" data-id="${
			perfume.perfume_id
		}">View Details</button>
	`;
	return card;
}

function showAllNotesScreen() {
	$("#second-header-popup").fadeOut();
	clearDOM();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	const container = document.createElement("div");
	container.className = "card-container";

	notesList.forEach((note) => {
		const noteCard = document.createElement("div");
		noteCard.className = "card";
		noteCard.innerHTML = `
            <img src="${note.note_image}" alt="${note.name}">
            <div class="inner-card-text">
                <h3>${note.name}</h3>
            </div>
            <button value="${note.id}">View Perfumes</button>
        `;
		noteCard.addEventListener("click", () => {
			const stateObject = {
				section: "note",
				param: note.name,
			};

			
			window.history.pushState(stateObject, "", "note");

			showPerfumesByNote(note.name);
		});
		container.appendChild(noteCard);
	});

	const section = document.createElement("section");
	section.className = "scrollable-cards";
	section.appendChild(container);

	document.querySelector(".all").appendChild(section);
}

function showMenPerfumesScreen() {
	previousScreen = "menPerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
		<div class="search-controls">
			<div class="sort-controls">
				<label for="sort-select">Sort by:</label>
				<select id="sort-select">
					<option value="name-asc">Name (A-Z)</option>
					<option value="name-desc">Name (Z-A)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">Min Price:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">Max Price:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">Apply Filter</button>
			</div>
		</div>
		<div id="search-results" class="search-results-grid"></div>
	`;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for men
	const menPerfumes = allPerfumes.filter(
		(item) => item.gender === "0" || item.gender === "1"
	);

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
				<div class="perfume-card" data-id="${item.perfume_id}">
					<img src="${item.perfume_image}" alt="${item.perfume_name}">
					<h3>${item.perfume_name.replace(/-/g, " ")}</h3>
					<p>Brand: ${item.brand_name}</p>
					<p>Price: $${item.price}</p>
					${item.new_price ? `<p class="sale-price">Sale: $${item.new_price}</p>` : ""}
					<button class="view-details">View Details</button>
				</div>
			`;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;

				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(menPerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...menPerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = menPerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showWomenPerfumesScreen() {
	previousScreen = "womenPerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
		<div class="search-controls">
			<div class="sort-controls">
				<label for="sort-select">Sort by:</label>
				<select id="sort-select">
					<option value="name-asc">Name (A-Z)</option>
					<option value="name-desc">Name (Z-A)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">Min Price:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">Max Price:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">Apply Filter</button>
			</div>
		</div>
		<div id="search-results" class="search-results-grid"></div>
	`;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for women
	const womenPerfumes = allPerfumes.filter(
		(item) => item.gender === "0" || item.gender === "2"
	);

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
				<div class="perfume-card" data-id="${item.perfume_id}">
					<img src="${item.perfume_image}" alt="${item.perfume_name}">
					<h3>${item.perfume_name.replace(/-/g, " ")}</h3>
					<p>Brand: ${item.brand_name}</p>
					<p>Price: $${item.price}</p>
					${item.new_price ? `<p class="sale-price">Sale: $${item.new_price}</p>` : ""}
					<button class="view-details">View Details</button>
				</div>
			`;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(womenPerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...womenPerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = womenPerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showUnisexPerfumesScreen() {
	previousScreen = "unisexPerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
		<div class="search-controls">
			<div class="sort-controls">
				<label for="sort-select">Sort by:</label>
				<select id="sort-select">
					<option value="name-asc">Name (A-Z)</option>
					<option value="name-desc">Name (Z-A)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">Min Price:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">Max Price:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">Apply Filter</button>
			</div>
		</div>
		<div id="search-results" class="search-results-grid"></div>
	`;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for unisex
	const unisexPerfumes = allPerfumes.filter((item) => item.gender === "0");

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
				<div class="perfume-card" data-id="${item.perfume_id}">
					<img src="${item.perfume_image}" alt="${item.perfume_name}">
					<h3>${item.perfume_name.replace(/-/g, " ")}</h3>
					<p>Brand: ${item.brand_name}</p>
					<p>Price: $${item.price}</p>
					${item.new_price ? `<p class="sale-price">Sale: $${item.new_price}</p>` : ""}
					<button class="view-details">View Details</button>
				</div>
			`;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(unisexPerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...unisexPerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = unisexPerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showTestersPerfumesScreen() {
	previousScreen = "testersPerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for testers (item.box === '1')
	const testersPerfumes = allPerfumes.filter((item) => item.box === "1");

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
                <div class="perfume-card" data-id="${item.perfume_id}">
                    <img src="${item.perfume_image}" alt="${item.perfume_name}">
                    <h3>${item.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${item.brand_name}</p>
                    <p>Price: $${item.price}</p>
                    ${
											item.new_price
												? `<p class="sale-price">Sale: $${item.new_price}</p>`
												: ""
										}
                    <button class="view-details">View Details</button>
                </div>
            `;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(testersPerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...testersPerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = testersPerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showUnboxedPerfumesScreen() {
	previousScreen = "unboxedPerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for unboxed (item.box === '2')
	const unboxedPerfumes = allPerfumes.filter((item) => item.box === "2");

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
                <div class="perfume-card" data-id="${item.perfume_id}">
                    <img src="${item.perfume_image}" alt="${item.perfume_name}">
                    <h3>${item.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${item.brand_name}</p>
                    <p>Price: $${item.price}</p>
                    ${
											item.new_price
												? `<p class="sale-price">Sale: $${item.new_price}</p>`
												: ""
										}
                    <button class="view-details">View Details</button>
                </div>
            `;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(unboxedPerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...unboxedPerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = unboxedPerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showRarePerfumesScreen() {
	previousScreen = "rarePerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for rare (item.box === '3')
	const rarePerfumes = allPerfumes.filter((item) => item.box === "3");

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
                <div class="perfume-card" data-id="${item.perfume_id}">
                    <img src="${item.perfume_image}" alt="${item.perfume_name}">
                    <h3>${item.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${item.brand_name}</p>
                    <p>Price: $${item.price}</p>
                    ${
											item.new_price
												? `<p class="sale-price">Sale: $${item.new_price}</p>`
												: ""
										}
                    <button class="view-details">View Details</button>
                </div>
            `;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(rarePerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...rarePerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = rarePerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}

function showCartScreen() {
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create a container for the cart screen
	const container = document.createElement("div");
	container.className = "cart-screen-container";

	// Get the cart items
	const cart = getCart();

	// Display cart items
	let cartItemsHtml = "<h2>Your Cart</h2><div class='cart-items'>";

	if (cart.length === 0) {
		cartItemsHtml += "<p>Your cart is empty.</p>";
	} else {
		cart.forEach((item, index) => {
			const totalItemPrice = item.quantity * item.price;
			cartItemsHtml += `
                <div class="cart-item" data-id="${
									item.perfumeId
								}"><div class='cart-item-first-line'>
                   <img src="${item.img}" alt="${
				item.perfumeName.length > 20
					? item.perfumeName.substring(0, 18)
					: item.perfumeName
			}">
                    <h3 class="item-name">${item.perfumeName}</h3>
                    <p>${item.size}</p></div>
					<div class='cart-item-second-line'>
                    <p><button class="quantity-btn" data-action="decrease" data-index="${index}">-</button> 
                    ${item.quantity} 
                    <button class="quantity-btn" data-action="increase" data-index="${index}">+</button></p>
                    <p class="item-price">Total Price: $<span id="item-price-${index}">${totalItemPrice}</span></p>
                    <button class="view-item" data-id="${
											item.perfumeId
										}">View Item</button>
                </div></div>
            `;
		});
		cartItemsHtml += `<button id="clear-cart">Clear Cart</button>`;
	}

	cartItemsHtml += "</div>";

	// Create input fields for user details
	const formHtml = `
        <h2>Shipping Information</h2>
        <form id="order-form">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" required>
            </div>
            <div class="form-group">
                <label for="street">Street:</label>
                <input type="text" id="street" name="street" required>
            </div>
            <div class="form-group">
                <label for="phone-number">Phone Number:</label>
                <input type="tel" id="phone-number" name="phone-number" required pattern="[0-9]{11}">
            </div>
            <button type="submit">Submit Order</button>
			<span id='refund'>*refund policies are on broken perfumes</span>
        </form>
    `;

	container.innerHTML = cartItemsHtml + formHtml;
	document.querySelector(".all").appendChild(container);

	// Event listeners for quantity buttons
	document.querySelectorAll(".quantity-btn").forEach((button) => {
		button.addEventListener("click", function (e) {

			// showCartScreen();
			const index = parseInt(this.getAttribute("data-index"));
			const action = this.getAttribute("data-action");
			updateCartQuantity(index, action);
			showCartScreen(); // Re-render the cart screen to reflect changes
			updateItemPrice(index); // Update the price for this item
		});
	});

	// Event listener for the "View Item" buttons
	document.querySelectorAll(".view-item").forEach((button) => {
		button.addEventListener("click", function (e) {
			const perfumeId = this.getAttribute("data-id");
			const stateObject = {
				section: "single",
				param: perfumeId,
			};

			
			window.history.pushState(stateObject, "", "item");
			singleItemShow(perfumeId);
		});
	});

	// Event listener for the "Clear Cart" button
	if (document.getElementById("clear-cart")) {
		document
			.getElementById("clear-cart")
			.addEventListener("click", function () {
				localStorage.removeItem("cart");
				showCartScreen(); // Re-render the cart screen to reflect the empty cart
			});
	}

	// Add event listener to the form
	document
		.getElementById("order-form")
		.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get and sanitize user input
			const name = sanitizeInput(document.getElementById("name").value);
			const city = sanitizeInput(document.getElementById("city").value);
			const street = sanitizeInput(document.getElementById("street").value);
			const phoneNumber = sanitizeInput(
				document.getElementById("phone-number").value
			);

			// Validate the input
			if (cart.length == 0) {
				// Proceed with the order submission logic

				alert("card is empty");
			} else if (
				validateInput(name, city, street, phoneNumber && cart.length > 0)
			) {
				// Proceed with the order submission logic
				// submitOrder(name, city, street, phoneNumber, cart);
				//telesend
				currenrCard = getCart();
				currenrCard.forEach((obj) => {
					const keys = Object.keys(obj); // Get an array of the object's keys
					const lastKey = keys[keys.length - 1]; // Identify the last key
					const firstKey = keys[0]; // Identify the last key
					delete obj[lastKey];
					delete obj[firstKey];
				});
				bot.sendMessage("**********").then((res) => {
					bot.sendMessage("new order:").then((res) => {
						bot.sendMessage("name: " + $("#name").val()).then((res) => {
							bot.sendMessage("place: " + $("#city").val()).then((res) => {
								bot
									.sendMessage("address: " + $("#street").val())
									.then((res) => {
										bot
											.sendMessage("phone number: " + $("#phone-number").val())
											.then((res) => {
												currenrCard.forEach((obj, index) => {
													bot
														.sendMessage(JSON.stringify(currenrCard[index]))
														.then((res) => {});
												});
											});
									});
							});
						});
					});
				});

				localStorage.removeItem("cart");
				alert("Order submitted successfully!");
			} else {
				alert("Please fill out all fields correctly.");
			}
		});
}

function updateCartQuantity(index, action) {
	let cart = getCart();
	if (action === "increase") {
		cart[index].quantity++;
	} else if (action === "decrease") {
		if (cart[index].quantity <= 1) {
			cart.splice(index, 1);
			showCartScreen();
			// Remove the item if quantity is 0 or less
		} else {
			cart[index].quantity--;
		}
	}
	localStorage.setItem("cart", JSON.stringify(cart));
}

function updateItemPrice(index) {
	const cart = getCart();
	const totalItemPrice = cart[index].quantity * cart[index].price;
	document.getElementById(`item-price-${index}`).textContent = totalItemPrice;
}

function sanitizeInput(input) {
	const sanitizedInput = input.replace(
		/[^a-zA-Z0-9\u0621-\u064A\u0660-\u0669\s]/g,
		""
	);
	// Allow only letters, numbers, and spaces
	return sanitizedInput.trim(); // Remove leading and trailing whitespace
}

function validateInput(name, city, street, phoneNumber) {
	// Basic validation logic
	if (!name || !city || !street || !phoneNumber) {
		return false;
	}
	// if (phoneNumber.length !== 11) {
	// 	return false;
	// }
	return true;
}

function submitOrder(name, city, street, phoneNumber, cart) {
	// Here, you would typically send the order details to the server


	// Clear the cart after submission
	localStorage.removeItem("cart");
}

function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

function showNewArrivalsScreen() {
	//
	//
	//
	//

	previousScreen = "newArrivals";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for new arrivals (status === '2' or status === '4')
	const newArrivals = allPerfumes.filter(
		(item) => item.status === "2" || item.status === "4"
	);

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
                <div class="perfume-card" data-id="${item.perfume_id}">
                    <img src="${item.perfume_image}" alt="${item.perfume_name}">
                    <h3>${item.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${item.brand_name}</p>
                    <p>Price: $${item.price}</p>
                    ${
											item.new_price
												? `<p class="sale-price">Sale: $${item.new_price}</p>`
												: ""
										}
                    <button class="view-details">View Details</button>
                </div>
            `;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(newArrivals);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...newArrivals];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = newArrivals.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}

//
//

let userMovement = [];

window.addEventListener("popstate", function (event) {
	// event.preventDefault;
	


	// console.log(userMovement[userMovement.length - 2].section);

	switch (event.state.section) {
		case "main":

			loadHome();
			// showOnSalePerfumesScreen();

			break;

		case "cart":
			showCartScreen();
			break;
		case "allperfumes":
			showAllPerfumesScreen();
			break;
		case "men":
			showMenPerfumesScreen();
			break;
		case "women":
			showWomenPerfumesScreen();
			break;
		case "unisex":
			showUnisexPerfumesScreen();
			break;
		case "testers":
			showTestersPerfumesScreen();
			break;
		case "unboxed":
			showUnboxedPerfumesScreen();
			break;
		case "rares":
			showRarePerfumesScreen();
			break;
		case "new arrival":
			showNewArrivalsScreen();
			break;
		case "best-sellers":
			showOnSalePerfumesScreen();
			break;
		case "all-perfumes":
			showAllPerfumesScreen();
			break;
		case "brands":
			showAllBrandsScreen();
			break;
		case "notes":
			showAllNotesScreen();
			break;
		case "single":
			singleItemShow(event.state.param);
			break;
		case "note":
			showPerfumesByNote(event.state.param);
			break;
		case "brand":
			searchByBrandScreen(event.state.param);
			break;

		default:
	}
});

//
//
//
//
function showOnSalePerfumesScreen() {
	//
	//
	//
	//
	//

	// console.log('You are now on the Home page.');

	//
	//
	//
	//
	previousScreen = "onSalePerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Filter perfumes for on sale (status === '3' or status === '4')
	const onSalePerfumes = allPerfumes.filter(
		(item) => item.status === "3" || item.status === "4"
	);

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
                <div class="perfume-card" data-id="${item.perfume_id}">
                    <img src="${item.perfume_image}" alt="${item.perfume_name}">
                    <h3>${item.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${item.brand_name}</p>
                    <p>Price: $${item.price}</p>
                    ${
											item.new_price
												? `<p class="sale-price">Sale: $${item.new_price}</p>`
												: ""
										}
                    <button class="view-details">View Details</button>
                </div>
            `;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(onSalePerfumes);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...onSalePerfumes];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = onSalePerfumes.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}
function showAllPerfumesScreen() {
	previousScreen = "allPerfumes";
	clearDOM();
	$("#second-header-popup").fadeOut();
	$(".search-popup").fadeOut();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();

	// Create container for search results and controls
	const container = document.createElement("div");
	container.className = "search-results-container";

	// Add sorting and filtering controls
	const controlsHtml = `
        <div class="search-controls">
            <div class="sort-controls">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">Min Price:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">Max Price:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">Apply Filter</button>
            </div>
        </div>
        <div id="search-results" class="search-results-grid"></div>
    `;

	container.innerHTML = controlsHtml;
	document.querySelector(".all").appendChild(container);

	const searchResultsElement = document.getElementById("search-results");

	// Get all perfumes
	const allPerfumesList = allPerfumes; // No filter applied, just displaying all perfumes

	function renderSearchResults(results) {
		searchResultsElement.innerHTML = "";
		results.forEach((item) => {
			const perfumeCard = `
                <div class="perfume-card" data-id="${item.perfume_id}">
                    <img src="${item.perfume_image}" alt="${item.perfume_name}">
                    <h3>${item.perfume_name.replace(/-/g, " ")}</h3>
                    <p>Brand: ${item.brand_name}</p>
                    <p>Price: $${item.price}</p>
                    ${
											item.new_price
												? `<p class="sale-price">Sale: $${item.new_price}</p>`
												: ""
										}
                    <button class="view-details">View Details</button>
                </div>
            `;
			searchResultsElement.innerHTML += perfumeCard;
		});

		// Add event listeners to "View Details" buttons
		document.querySelectorAll(".view-details").forEach((button) => {
			button.addEventListener("click", function () {
				const perfumeId = this.closest(".perfume-card").dataset.id;
				const stateObject = {
					section: "single",
					param: perfumeId,
				};

				
				window.history.pushState(stateObject, "", "item");
				singleItemShow(perfumeId);
			});
		});
	}

	// Initial render
	renderSearchResults(allPerfumesList);

	// Sorting functionality
	document
		.getElementById("sort-select")
		.addEventListener("change", function () {
			const sortValue = this.value;
			let sortedResults = [...allPerfumesList];

			switch (sortValue) {
				case "name-asc":
					sortedResults.sort((a, b) =>
						a.perfume_name.localeCompare(b.perfume_name)
					);
					break;
				case "name-desc":
					sortedResults.sort((a, b) =>
						b.perfume_name.localeCompare(a.perfume_name)
					);
					break;
				case "price-asc":
					sortedResults.sort(
						(a, b) => (a.new_price || a.price) - (b.new_price || b.price)
					);
					break;
				case "price-desc":
					sortedResults.sort(
						(a, b) => (b.new_price || b.price) - (a.new_price || a.price)
					);
					break;
			}

			renderSearchResults(sortedResults);
		});

	// Filtering functionality
	document
		.getElementById("apply-filter")
		.addEventListener("click", function () {
			const minPrice =
				parseFloat(document.getElementById("min-price").value) || 0;
			const maxPrice =
				parseFloat(document.getElementById("max-price").value) || Infinity;

			const filteredResults = allPerfumesList.filter((item) => {
				const itemPrice = item.new_price || item.price;
				return itemPrice >= minPrice && itemPrice <= maxPrice;
			});

			renderSearchResults(filteredResults);
		});
}

//tele
const bot = new Bot(
	"6351195280:AAFqMZgBX2qlMO3VBtuuWRh4jGvVFC0KSrE",
	"646463422"
);
const stateObject = { section: "main" };

window.history.pushState(stateObject, "", "");
