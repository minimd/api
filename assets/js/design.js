//headers



$('.second-nav').hide();

$("#search-input").on("click", function () {
	$("#search-input").toggleClass("toggle-border");
});

$("#search-btn").click(function (e) {
	e.preventDefault();
	$(".first-nav").hide();
	$(".second-nav").removeClass("hidden");
    $('.second-nav').fadeIn();
});
$("#search-cancel").click(function (e) {
	e.preventDefault();
	$(".second-nav").hide();
	$(".first-nav").fadeIn();
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
$("#categories-nav").hover(
	function () {
        $('#second-header-popup').removeClass('hidden');
		$("#second-header-popup").fadeIn();
	},
	function () {}
);
$("#second-header-popup").hover(
	function () {},
	function () {
		$("#second-header-popup").fadeOut();
	}
);
$('.header-nav').hover(function () {
    $("#second-header-popup").fadeOut();
        
    }, function () {
        // out
    }
);


