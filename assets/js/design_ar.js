//general comments
//card name
// ..item.perfume_name.replace("-", " ").length <20 ? item.perfume_name.replace("-", " ") : item.perfume_name.replace("-", " ").substring(0,18) + `...`

//headers

$(".second-nav").hide();

$("#search-input").on("click", function () {
  $("#search-input").toggleClass("toggle-border");
});
$("h1").click(function (e) {
  e.preventDefault();
  window.location.reload();
});

$("#search-btn").click(function (e) {
  // e.preventDefault();
  $(".first-nav").hide();
  $(".second-nav").removeClass("hidden");
  $(".second-nav").fadeIn();
  $("#search-bar").val("");
  $("#search-bar").focus();
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
  window.location.reload();
});
$("h1").click(function (e) {
  e.preventDefault();
  window.location.reload();
});
$("p#cart").click(function (e) {
  showCartScreen();
});
$("#cart-div img").click(function (e) {
  showCartScreen();
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
//mens
$(".men-key").click(function (e) {
  showMenPerfumesScreen();
});
$(".women-key").click(function (e) {
  showWomenPerfumesScreen();
});
$(".unisex-key").click(function (e) {
  showUnisexPerfumesScreen();
});
$(".testers-key").click(function (e) {
  showTestersPerfumesScreen();
});
$(".unboxed-key").click(function (e) {
  showUnboxedPerfumesScreen();
});
$(".rares-key").click(function (e) {
  showRarePerfumesScreen();
});
$("#new-arrivals-nav").click(function (e) {
  showNewArrivalsScreen();
});
$("#best-sellers-nav").click(function (e) {
  showOnSalePerfumesScreen();
});
$("#all-perfumes-nav").click(function (e) {
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
fetch("http://localhost/api/get_all_brands", {}).then((response) =>
  response.json().then((data) => {
    brandsList = data;

    document.querySelector(
      ".popup-results"
    ).innerHTML = `<button class= 'show-all-nav' id='show-all-brands'>عرض كل البراندات</button>`;

    // re-happens if the button is clicked
    document
      .querySelector(".brands-key")
      .addEventListener("click", function (e) {
        document.querySelector(
          ".popup-results"
        ).innerHTML = `<button class= 'show-all-nav' id='show-all-brands'>عرض كل البراندات</button>`;

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
              searchByBrandScreen(e.target.getAttribute("value"));
            });
        }
        $("#show-all-brands").click(function (e) {
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
          searchByBrandScreen(e.target.getAttribute("value"));
        });
    }
    $("#show-all-brands").click(function (e) {
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
        ).innerHTML = `<button class= 'show-all-nav' id='show-all-notes'>عرض كل النوتات</button>`;
        notesToShow.forEach((note) => {
          document.querySelector(".popup-results").innerHTML += `
    <div class="popup-result-item" value='${note.id}'>
        <img src="${note.note_image}" alt="${note.name}" value='${note.name}'>
        <span>${note.name}</span>
    </div>`;
        });
        for (let i = 0; i < notesToShow.length; i++) {
          document
            .querySelectorAll(".popup-result-item")
            [i].addEventListener("click", function (e) {
              showPerfumesByNote(e.target.getAttribute("value"));
            });
        }

        $("#show-all-notes").click(function (e) {
          e.preventDefault();
          showAllNotesScreen();
        });
      });

    // Limit the number of brands to 8
    const notesToShow = notesList.slice(0, 15);
  })
);

//ultimate fetch
let allPerfumes;

function loadHome() {
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
            <button value='${item.perfume_id}'>عرض التفاصيل</button>
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

            <button value='${item.perfume_id}'>عرض التفاصيل</button>
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
        let miniSearchItems = searchBarResults.slice(0, 6);
        if (miniSearchItems.length > 0) {
          console.log(miniSearchItems);
        } else {
          console.log("No results found.");
        }

        // Here you can add code to display the search results

        document.querySelector(
          ".search-popup-container"
        ).innerHTML = `<div class='margined'><button class= 'show-all-nav' id='show-all-search'>كل النتائج</button><div>`;

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
        $("#show-all-search").click(function (e) {
          e.preventDefault();
          console.log("sy");

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
            e.preventDefault();
            singleItemShow(e.target.getAttribute("value"));

            e.preventDefault();
            $(".second-nav").hide();
            $(".first-nav").fadeIn();
            $(".search-popup").fadeOut();

            console.log(e.target.getAttribute("value"));
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

function singleItemShow(perfumeId) {
  // Find the selected perfume from the data array
  const selectedPerfume = allPerfumes.find(
    (item) => item.perfume_id == perfumeId
  );

  if (selectedPerfume) {
    let sizeOptions = `<select id="size-select">
            <option value="1">Size: ${selectedPerfume.size || "Default"} - $${
      selectedPerfume.price
    }</option>`;

    if (selectedPerfume.size_2nd) {
      sizeOptions += `<option value="2">Size: ${selectedPerfume.size_2nd} - $${selectedPerfume.price_2nd}</option>`;
    }

    sizeOptions += `</select>`;

    // Replace hyphens with spaces in perfume name
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
                        <h2>${formattedPerfumeName}</h2>
                        <h3>${selectedPerfume.brand_name}</h3>

                        <p>المصمم: ${selectedPerfume.perfumer.replace(
                          "-",
                          " "
                        )}</p>
                        ${sizeOptions}
                        <p class="price">السعر $${selectedPerfume.price}</p>
                        ${
                          selectedPerfume.new_price
                            ? `<p class="discounted-price">السعر المخفض $${selectedPerfume.new_price}</p>`
                            : ""
                        }
                        <div class="quantity-container">
                            <label for="quantity">الكمية:</label>
                            <input type="number" id="quantity" name="quantity" min="1" value="1">
                        </div>
                        <button class="add-to-cart">اضافة للسلة</button>
                    </div>
                
                <div class="notes-section">
                    <h4>Fragrance Notes</h4>
                    <div class="notes-container">
                        <div class="note-category">
                            <h5>البداية</h5>
                            <p>${selectedPerfume.top_note_names || "N/A"}</p>
                        </div>
                        <div class="note-category">
                            <h5>الوسط</h5>
                            <p>${selectedPerfume.middle_note_names || "N/A"}</p>
                        </div>
                        <div class="note-category">
                            <h5>الاستقرار</h5>
                            <p>${selectedPerfume.base_note_names || "N/A"}</p>
                        </div>
                    </div>
                </div>
				</div>
                <div class="description">
                    <h4>الوصف</h4>
                    <p>${selectedPerfume.description}</p>
                </div>
            </div>
        `;

    $(".add-to-cart").click(function (e) {
      const quantity = document.getElementById("quantity").value;
      const sizeSelect = document.getElementById("size-select");
      const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].text;
      const price =
        document.getElementById("size-select").value === "1"
          ? selectedPerfume.new_price || selectedPerfume.price
          : selectedPerfume.new_price_2nd || selectedPerfume.price_2nd;

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
      showCartPopup(formattedPerfumeName, selectedSize + "$", quantity, price);
    });

    // Add event listener for the "Add to Cart" button

    // Add event listener for size selection
    document
      .getElementById("size-select")
      .addEventListener("change", function (e) {
        const priceElement = document.querySelector(".price");
        const discountedPriceElement =
          document.querySelector(".discounted-price");

        if (e.target.value === "1") {
          priceElement.textContent = `Price: $${selectedPerfume.price}`;
          if (selectedPerfume.new_price) {
            discountedPriceElement.textContent = `السعر المخفض: $${selectedPerfume.new_price}`;
          }
        } else if (e.target.value === "2") {
          priceElement.textContent = `Price: $${selectedPerfume.price_2nd}`;
          if (selectedPerfume.new_price_2nd) {
            discountedPriceElement.textContent = `السعر المخفض: $${selectedPerfume.new_price_2nd}`;
          } else if (selectedPerfume.new_price_2nd == null) {
            discountedPriceElement.textContent = ``;
          }
        }
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
    console.log(cart);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
			
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
					<p>البراند: ${item.brand_name}</p>
					<p>السعر: $${item.price}</p>
					${
            item.new_price
              ? `<p class="sale-price">السعر بعد الخصم: $${item.new_price}</p>`
              : ""
          }
					<button class="view-details">عرض التفاصيل</button>
				</div>
			`;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        document.body.innerHTML += `<button class= 'show-all-nav' id='back'><img src='https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff'/></button>`;

        $("#back").click(function (e) {
          searchNameScreen(previousScreen);
          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
				
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
					<p>البراند: ${item.brand_name}</p>
					<p>السعر: $${item.price}</p>
					${
            item.new_price
              ? `<p class="sale-price">السعر بعد الخصم: $${item.new_price}</p>`
              : ""
          }
					<button class="view-details">عرض التفاصيل</button>
				</div>
			`;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        // Create the button element
        let button = document.createElement("button");
        button.className = "show-all-nav";
        button.id = "back";

        // Create the image element
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";

        // Append the image to the button
        button.appendChild(img);

        // Append the button to the body
        document.body.appendChild(button);

        $("#back").click(function (e) {
          searchByBrandScreen(previousScreen);

          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";

        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";

        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showPerfumesByNote(noteName);
          $("#back").remove();
        });
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
        ? `<p class="sale-price">السعر: $${perfume.new_price}</p>`
        : ""
    }
		<button class="view-details" data-id="${
      perfume.perfume_id
    }">عرض التفاصيل</button>
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
    noteCard.addEventListener("click", () => showPerfumesByNote(note.name));
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
					<p>البراند: ${item.brand_name}</p>
					<p>السعر: $${item.price}</p>
					${
            item.new_price
              ? `<p class="sale-price">السعر بعد الخصم: $${item.new_price}</p>`
              : ""
          }
					<button class="view-details">عرض التفاصيل</button>
				</div>
			`;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let button = document.createElement("button");
        button.className = "show-all-nav";
        button.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        button.appendChild(img);
        document.body.appendChild(button);

        $("#back").click(function (e) {
          showMenPerfumesScreen();
          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
					<p>البراند: ${item.brand_name}</p>
					<p>السعر: $${item.price}</p>
					${
            item.new_price
              ? `<p class="sale-price">السعر بعد الخصم: $${item.new_price}</p>`
              : ""
          }
					<button class="view-details">عرض التفاصيل</button>
				</div>
			`;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let button = document.createElement("button");
        button.className = "show-all-nav";
        button.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        button.appendChild(img);
        document.body.appendChild(button);

        $("#back").click(function (e) {
          showWomenPerfumesScreen();
          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
					<p>البراند: ${item.brand_name}</p>
					<p>السعر: $${item.price}</p>
					${
            item.new_price
              ? `<p class="sale-price">السعر بعد الخصم: $${item.new_price}</p>`
              : ""
          }
					<button class="view-details">عرض التفاصيل</button>
				</div>
			`;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let button = document.createElement("button");
        button.className = "show-all-nav";
        button.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        button.appendChild(img);
        document.body.appendChild(button);

        $("#back").click(function (e) {
          showUnisexPerfumesScreen();
          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
                        ? `<p class="sale-price">السعر بعد التخفيض $${item.new_price}</p>`
                        : ""
                    }
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            `;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showTestersPerfumesScreen();
          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
                        ? `<p class="sale-price">السعر بعد التخفيض $${item.new_price}</p>`
                        : ""
                    }
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            `;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showUnboxedPerfumesScreen();
          $("#back").remove();
        });
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
				<label for="sort-select">ترتيب حسب:</label>
				<select id="sort-select">
					<option value="name-asc">الاسم (أ-ي)</option>
					<option value="name-desc">الاسم (ي-أ)</option>
					<option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
					<option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
				</select>
			</div>
			<div class="filter-controls">
				<label for="min-price">الحد الأدنى للسعر:</label>
				<input type="number" id="min-price" min="0">
				<label for="max-price">الحد الأقصى للسعر:</label>
				<input type="number" id="max-price" min="0">
				<button id="apply-filter">تطبيق الفلتر</button>
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
                        ? `<p class="sale-price">السعر بعد التخفيض $${item.new_price}</p>`
                        : ""
                    }
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            `;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showRarePerfumesScreen();
          $("#back").remove();
        });
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
                <div class="cart-item" data-id="${item.perfumeId}">
                   <img src="${item.img}" alt="${item.perfumeName}">
                    <h3 class="item-name">${item.perfumeName}</h3>
                    <p>${item.size}</p>
                    <p><button class="quantity-btn" data-action="decrease" data-index="${index}">-</button> 
                    ${item.quantity} 
                    <button class="quantity-btn" data-action="increase" data-index="${index}">+</button></p>
                    <p class="item-price">السعر: $<span id="item-price-${index}">${totalItemPrice}</span></p>
                    <button class="view-item" data-id="${item.perfumeId}">عرض</button>
                </div>
            `;
    });
    cartItemsHtml += `<button id="clear-cart">الغاء السلة</button>`;
  }

  cartItemsHtml += "</div>";

  // Create input fields for user details
  const formHtml = `
        <h2>Shipping Information</h2>
        <form id="order-form">
            <div class="form-group">
                <label for="name">الاسم:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="city">المحافظة</label>
                <input type="text" id="city" name="city" required>
            </div>
            <div class="form-group">
                <label for="street">العنوان:</label>
                <input type="text" id="street" name="street" required>
            </div>
            <div class="form-group">
                <label for="phone-number">رقم الهاتف</label>
                <input type="tel" id="phone-number" name="phone-number" required pattern="[0-9]{11}">
            </div>
            <button type="submit">تثبيت الطلب</button>
        </form>
    `;

  container.innerHTML = cartItemsHtml + formHtml;
  document.querySelector(".all").appendChild(container);

  // Event listeners for quantity buttons
  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const index = parseInt(this.getAttribute("data-index"));
      const action = this.getAttribute("data-action");
      updateCartQuantity(index, action);
      updateItemPrice(index); // Update the price for this item
      showCartScreen(); // Re-render the cart screen to reflect changes
    });
  });

  // Event listener for the "View Item" buttons
  document.querySelectorAll(".view-item").forEach((button) => {
    button.addEventListener("click", function (e) {
      const perfumeId = this.getAttribute("data-id");
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

        alert("السلة فارغة");
      } else if (
        validateInput(name, city, street, phoneNumber && cart.length > 0)
      ) {
        // Proceed with the order submission logic
        submitOrder(name, city, street, phoneNumber, cart);
        alert("تم تثبيت طلبك. سيتم التواصل معك قريبا");
      } else {
        alert("يرجى ملئ البيانات المطلوبة بشكل صحيح");
      }
    });
}

function updateCartQuantity(index, action) {
  let cart = getCart();
  if (action === "increase") {
    cart[index].quantity++;
  } else if (action === "decrease") {
    cart[index].quantity--;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1); // Remove the item if quantity is 0 or less
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
  console.log("Order submitted:");
  console.log("Name:", name);
  console.log("City:", city);
  console.log("Street:", street);
  console.log("Phone Number:", phoneNumber);
  console.log("Cart Items:", cart);

  // Clear the cart after submission
  localStorage.removeItem("cart");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function showNewArrivalsScreen() {
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
                <label for="sort-select">ترتيب حسب:</label>
                <select id="sort-select">
                    <option value="name-asc">الاسم (أ-ي)</option>
                    <option value="name-desc">الاسم (ي-أ)</option>
                    <option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
                    <option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">الحد الأدنى للسعر:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">الحد الأقصى للسعر:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">تطبيق الفلتر</button>
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
                        ? `<p class="sale-price">السعر بعد التخفيض $${item.new_price}</p>`
                        : ""
                    }
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            `;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showNewArrivalsScreen();
          $("#back").remove();
        });
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
function showOnSalePerfumesScreen() {
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
                <label for="sort-select">ترتيب حسب:</label>
                <select id="sort-select">
                    <option value="name-asc">الاسم (أ-ي)</option>
                    <option value="name-desc">الاسم (ي-أ)</option>
                    <option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
                    <option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
                </select>
            </div>
            <div class="filter-controls">
                <label for="min-price">الحد الأدنى للسعر:</label>
                <input type="number" id="min-price" min="0">
                <label for="max-price">الحد الأقصى للسعر:</label>
                <input type="number" id="max-price" min="0">
                <button id="apply-filter">تطبيق الفلتر</button>
            </div>
        </div>
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
                        ? `<p class="sale-price">السعر بعد التخفيض $${item.new_price}</p>`
                        : ""
                    }
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            `;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showOnSalePerfumesScreen();
          $("#back").remove();
        });
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
		  <label for="sort-select">ترتيب حسب:</label>
		  <select id="sort-select">
			  <option value="name-asc">الاسم (أ-ي)</option>
			  <option value="name-desc">الاسم (ي-أ)</option>
			  <option value="price-asc">السعر (من الأقل إلى الأعلى)</option>
			  <option value="price-desc">السعر (من الأعلى إلى الأقل)</option>
		  </select>
	  </div>
	  <div class="filter-controls">
		  <label for="min-price">الحد الأدنى للسعر:</label>
		  <input type="number" id="min-price" min="0">
		  <label for="max-price">الحد الأقصى للسعر:</label>
		  <input type="number" id="max-price" min="0">
		  <button id="apply-filter">تطبيق الفلتر</button>
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
                        ? `<p class="sale-price">السعر بعد التخفيض $${item.new_price}</p>`
                        : ""
                    }
                    <button class="view-details">عرض التفاصيل</button>
                </div>
            `;
      searchResultsElement.innerHTML += perfumeCard;
    });

    // Add event listeners to "عرض التفاصيل" buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const perfumeId = this.closest(".perfume-card").dataset.id;
        let backButton = document.createElement("button");
        backButton.className = "show-all-nav";
        backButton.id = "back";
        let img = document.createElement("img");
        img.src =
          "https://img.icons8.com/?size=100&id=40217&format=png&color=ffffff";
        backButton.appendChild(img);
        document.body.appendChild(backButton);

        $("#back").click(function (e) {
          showAllPerfumesScreen();
          $("#back").remove();
        });
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
