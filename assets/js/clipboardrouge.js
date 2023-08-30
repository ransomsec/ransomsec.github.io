function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function buttonBlink(btn, style) {
	btn.classList.remove("btn-light");
	btn.classList.add(style);
	await sleep(250); //Blink ms
	btn.classList.remove(style);
	btn.classList.add("btn-light");
}

// Select highlghted codes
var codeChunk = document.querySelectorAll("pre.highlight");

// Loop to add buttons
for (var i = 0; i < codeChunk.length; i++) {
	var pre = codeChunk.item(i);
	var btn = document.createElement("button");
	// Prepare button
	btn.innerHTML = "<i class='far fa-copy'></i>"; // Icon to be displayed on the button

	btn.style.position = "absolute";
	btn.style.right = "1em";

	btn.classList.add("btn", "btn--primary");

	// Identifier for ClipboardJS
	btn.setAttribute("data-clipboard-copy", "");

	pre.insertBefore(btn, pre.firstChild);
}

var codeChunk = document.querySelectorAll("pre.highlight");

// Loop to add buttons
for (var i = 0; i < codeChunk.length; i++) {
	var pre = codeChunk.item(i);
	var btn = document.createElement("button");
	btn.innerHTML = "<i class='far fa-copy'></i>"; // Icon to be displayed on the button

	btn.style.position = "absolute";
	btn.style.right = "1em";

	btn.classList.add("btn", "btn--primary");

	btn.setAttribute("data-clipboard-copy", "");

	pre.insertBefore(btn, pre.firstChild);
}

// Copy to clipboard
var clipboard = new ClipboardJS("[data-clipboard-copy]", {
	target: function (trigger) {
		return trigger.nextElementSibling;
	},
});

// Messages and make the button blink
clipboard.on("success", function (e) {
	e.clearSelection();
	buttonBlink(e.trigger, "btn--success");
	console.info("Action:", e.action);
	console.info("Text:", e.text);
	console.info("Trigger:", e.trigger);
});

clipboard.on("error", function (e) {
	e.clearSelection();
	buttonBlink(e.trigger, "btn--danger");
	console.info("Action:", e.action);
	console.info("Trigger:", e.trigger);
});
