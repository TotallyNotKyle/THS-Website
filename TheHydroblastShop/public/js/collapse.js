function toggleIcon(e) {
    $(e.target)
		.closest('h3')
		.next()
		.collapse("toggle");
}
$('.panel-title').click(toggleIcon);