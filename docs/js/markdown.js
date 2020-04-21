document.addEventListener('DOMContentLoaded', () => {
	addStyledCodeExamples();
	if(typeof createSubMenuItems !== 'undefined') {
		createSubMenuItems();
	}
})

function addStyledCodeExamples() {
	if(typeof hljs !== 'undefined') {
		hljs.initHighlighting();
		hljs.configure()
	}
}
