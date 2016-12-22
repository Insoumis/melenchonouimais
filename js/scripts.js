$(document).ready(function() {
	faq.forEach(function(entry, index) {
		generateEntry(entry, index);
	});
	
	$("#close-message").click(function() {
		$("#message").fadeOut(200);
		$("#gray-screen").fadeOut(200);
	});

	$(".toc-entry").click(function() {
		var index = this.id.match(/toc-entry-(.*)/);

		if (index) {
			$('html, body').animate({
				scrollTop: $("#entry-" + index[1]).offset().top - 20
			}, 500);
		} else if (this.id == "top") {
			$('html, body').animate({
				scrollTop: $("html").offset().top
			}, 500);
		}

		$(".toc-entry.selected").removeClass("selected");
		$(this).addClass("selected");

		if (index) {
			window.location.hash = $(this).data("question") + "?";
		} else {
			window.location.hash = "";
		}
	});
	/*
	$(".convinced-button").click(function() {
		ga('send', 'event', 'Convinced', 'click', "http://jlm2017.fr");
		window.open("http://jlm2017.fr", "_blank");
	});

	$("a").click(function() {
		ga('send', 'event', 'Outbound', 'click', $(this).attr("href"));
		return true;
	});
	*/
});

if (window.location.hash) {
	// Scroll to pre-selected question
	setTimeout(function(){
		var entryClass = window.location.hash.replace(/#/g,'').replace(/\?/g,'');
		$("div[data-question=" + entryClass + "]").click();
	}, 300);
};

var generateEntry = function(entry, index) {
	$(".faq").append("<div class='entry clearfix' id='entry-" + index + "'>\
		<div class='question-container'>\
			<div class='question'>" + entry.question + "</div>\
		</div>\
		<div class='answer-container'>\
			<div class='answer'>" + entry.answer + "</div>\
		</div>\
	</div>");

	if (entry.id.localeCompare("non-convaincu")!=0) {
		$(".table-of-contents .questions").append("<div class='toc-entry' id='toc-entry-" + index + "' data-question='" + entry.id + "'>" + entry.question + "</div>");
	}	
}
