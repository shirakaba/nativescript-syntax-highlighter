onmessage = (event) => {
	importScripts('highlight/highlight.pack.js');
	const result = self.hljs.highlightAuto(event.data.text, event.data.language);
	postMessage(result.value);
};
