var outputarea = document.getElementById('output');
var worker;
var language;
addEventListener('load', () => {
	worker = new Worker('worker.js');
	worker.onmessage = (event) => {
		outputarea.innerHTML = event.data;
		placeCaretAtEnd(outputarea);
	};
});


outputarea.addEventListener('paste', (event) => {
	const text = event.clipboardData.getData('text');
	if (text) {
		const selection = window.getSelection();
		if (!selection.rangeCount) return false;
		const span = document.createElement('span');
		span.innerHTML = text;
		selection.getRangeAt(0).insertNode(document.createTextNode(span.textContent));
		backgroundRefreshHighlighting(outputarea.textContent);
	}
	event.preventDefault();
});


function placeCaretAtEnd(el) {
	el.focus();
	if (typeof window.getSelection != 'undefined'
		&& typeof document.createRange != 'undefined') {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != 'undefined') {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}


outputarea.addEventListener('key', function (event) {
	refreshHighlighting();
}, false);

function refreshHighlighting() {
	const result = hljs.highlightAuto(outputarea.textContent, language);
	outputarea.innerHTML = result.value;
	placeCaretAtEnd(outputarea);
}


function backgroundRefreshHighlighting(text) {
	worker.postMessage({ text, language });
}

function setSource(code) {
	const result = hljs.highlightAuto(code.data, language);
	outputarea.innerHTML = result.value;
	placeCaretAtEnd(outputarea);
}

function changeStyle(style) {
	const link = document.getElementById('mainstyle');
	link.setAttribute('href', `highlight/styles/${style}.css`);
}


function changeLanguage(lang) {
	const newLang = hljs.getLanguage(lang);
	if (newLang) {
		language = [ lang ];
	} else {
		language = null;
	}
	refreshHighlighting();
}

