$(function() {



// var slideIndex = 1;

var currentIndex = 1;
var nextIndex = 0;
showSlides();

function showSlides() {

	
	var allElements = $(".my-slide");
	var numElements = $(".my-slide").length;
	var lastIndex = numElements - 1;
	// console.log("Number of elements " + numElements);
	$(".my-slide").hide();

	/*
	console.log("Elements before sorting");
	for (var i = 0; i < allElements.length; i++) {
		console.log($(allElements[i]).html());
	}
	*/
	/*
	$('.slideshow-wrapper').append($(allElements[4]));
	$('.slideshow-wrapper').append($(allElements[0]));
	$('.slideshow-wrapper').append($(allElements[1]));
	$('.slideshow-wrapper').append($(allElements[2]));
	$('.slideshow-wrapper').append($(allElements[3]));
	*/

	$('.slideshow-wrapper').append($(allElements[lastIndex]));
	for (var i = 0; i < lastIndex; i++) {
	 	$('.slideshow-wrapper').append($(allElements[i]));
	}

	/*
	console.log("Elements after sorting");
	for (var i = 0; i < allElements.length; i++) {
		console.log($(allElements[i]).html());
	}
	*/

	$(allElements[0]).addClass("slide-in");
	$(allElements[1]).addClass("slide-out");
	$(allElements[0]).show();
	$(allElements[1]).show();
	
	setTimeout(showSlides, 5000);

}



});