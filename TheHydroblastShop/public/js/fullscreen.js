(function($){
	$(function() {
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

		var imgIndex;
		var galleryLength;

		$(".full-spinner").hide();
		$(".next-arrow, .prev-arrow").hide();

		function loadImage(imgId) {
			console.log(imgId);
			var newSrc = $(".thumb img").get(imgId).src.replace("thumbs/","");
			newSrc = newSrc.replace("thumb","");
			
			$(".full-img").attr("src", newSrc);
			
			$(".full-img").hide();
			$(".full-spinner").fadeIn();
		}

		function toggleFullscreen() {
			
			galleryLength = $(".scrollable img").length - 1;
				
			if ($(".fullscreen").css("display") === "none"){
				if (isSafari) { $(".fullscreen").show(); }
				else { $(".fullscreen").fadeIn( function() { alignElements(); }); }
			} else {
				if (isSafari) { $(".fullscreen").hide(); }
				else { $(".fullscreen").fadeOut( function() { $(".next-arrow, .prev-arrow").hide(); }); }
			}
			alignElements();
		}

		function alignElements() {
			
			var vTop = $(window).height() / 2 - 32;
			var vImg = $(".full-img");

			$(".next-arrow img").css("top", vTop);
			$(".prev-arrow img").css("top", vTop);

			if (!isSafari) { 
				$(".full-img").on("load", function(){
					vImg.css("top", vTop - (vImg.height()/2));
				}); 
			}
		}
		
		//   Hide loading circle
		$(".full-img").on("load", function(){
			$(".full-img").show();
			$(".full-spinner").hide();
		});
		
		//   Click
		$(document).on("click", ".thumb img", function(e) {
			
			if ($(e.target).parents(".scrollable").length > 0) {
				$(".next-arrow, .prev-arrow").show();
				imgIndex = $(".scrollable img").index(this);
			} else {
				imgIndex = $(".thumb img").index(this);
			}
			loadImage(imgIndex);
			toggleFullscreen();
		});

		//   Close fullscreen
		$(".close-gallery, .full-img").on("click", function() {
			toggleFullscreen();
		});
		
		//   Next image
		$(".next-arrow").on("click", function() {
			if (imgIndex < galleryLength) {
				imgIndex++;
			} else {
				imgIndex = 0;
			}
			loadImage(imgIndex);
		});

		//   Previous image
		$(".prev-arrow").on("click", function() {
			if (imgIndex > 0) {
				imgIndex--;
			} else {
				imgIndex = galleryLength;
			}
			loadImage(imgIndex);
		});
	});
})(jQuery);