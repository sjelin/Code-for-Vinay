$(document).ready(function (e) {
	"use strict";

	//Initalize stored successes and errors
	var successKey = "successes";
	var errorKey = "errors";
	var successes = localStorage.getItem(successKey) || [];
	var errors = localStorage.getItem(errorKey) || [];

	//Print out stored successes and errors
	var printSuccess = function(data) {
		var $resp = $("<div>");
		var $header = $("<h1>");
		$header.text("Success!");
		$resp.append($header);
		var $msg = $("<p>");
		$msg.text("Server says:" + data.message);
		$resp.append($msg);
	}
	successes.forEach(printSuccess);


	var printError = function(data) {
		var $resp = $("<div>");
		var $header = $("<h1>");
		$header.text("Error!");
		$resp.append($header);
		var $msg = $("<p>");
		$msg.text(data.status + ": " + data.error);
		$resp.append($msg);
	}
	errors.forEach(printError);

	var $form = $("#upload_form");
	var $file = $form.find("input[type='file']");
	var $submit = $form.find("input[type='submit']");

	$form.on('submit', function(e) {
		e.preventDefault();
		var formData = new FormData(this);

		$.ajax({
			type:'POST',
			url: $(this).attr('action'),
			data: formData,
			cache:false,
			contentType: false,
			processData: false,
			success: function(data) {
				data = JSON.stringify(data.responseText);
				printSuccess(data);
				successes.push(data);
				localStorage.setItem(successKey, successes);
			},
			error: function(_, statusText, errorMsg) {
				var data = {status: statusText, error: ErrorMsg};
				printError(data);
				errors.push(data);
				localStorage.setItem(errorKey, errors);
			}
		});
	});

	$file.on("change", function() {
		$form.submit();
	});
});
