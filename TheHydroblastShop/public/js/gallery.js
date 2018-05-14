(function($){
	$(function() {
		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
		
		$('.gallery-spinner').hide();

		var amountToLoad = 6;
		var dbLength;
		var galleryEmpty = false;
		var galleryLength;

		// Load images
		function getImages(event) {
			if (event !== null) { event.preventDefault(); }
			galleryLength = $('.box').length;
			$.ajax('/js/photos.json', {
				success: function(data){
					$.each(data, function(index, item){
						loopGallery(item.id >= galleryLength && item.id < galleryLength + amountToLoad, index, item);
					});
					dbLength = data.length;
					galleryLength = $('.box').length;
					if (galleryLength >= dbLength) {
						galleryEmpty = true;
					}
				},
				beforeSend: function(){
					$('.next').hide();
					$('.gallery-spinner').fadeIn();
				},
				complete: function(){
					$('.gallery-spinner').hide();
					if (!galleryEmpty) {
						$('.next').fadeIn();
					}
					resizeImages();
				}
			});
		}

		// Create page elements
		function loopGallery(vTest, vIndex, vItem){
			if (vTest === true) {
				var newBox = document.createElement("div");
				newBox.setAttribute("class","box box-"+vIndex);
				
				var newView = document.createElement("div");
				newView.setAttribute("class","thumb");
				
				var newImg = document.createElement("img");
				newImg.setAttribute("id",vItem.id);
				newImg.setAttribute("src",vItem.imageThumb);
				
				document.getElementsByClassName("gallery")[0].appendChild(newBox);
				newBox.appendChild(newView);
				newView.appendChild(newImg);
			}
		}

		// Resizes and repositions images based on page width
		function resizeImages() {
			var imgWidth = "";
			var divWidth = "";
			var winWidth = $(window).width();

			if (winWidth < 600) {
				imgWidth = "90%";
				divWidth = "100%";
			} else if (winWidth < 1200) {
				imgWidth = "40%";
				divWidth = "90%";
			} else {
				imgWidth = "30%";
				divWidth = "75%";
			}

			$(".box").css("width",imgWidth);
			$(".content").css("max-width",divWidth);
		}

		$('.next').on('click', function(event){		// Load images on button clicked
			getImages(event);
		});

		$(document).ready( function(){
			getImages(null);	// Load images on page load
			window.setInterval(resizeImages, 200);	// Manage image sizes
		});
	});
})(jQuery);