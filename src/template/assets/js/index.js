document.addEventListener('DOMContentLoaded', () => {
	setActiveHeaderTab();
});

/**
 * On load set active tab to the top menu
 */
function setActiveHeaderTab() {
	const { pathname } = document.location;
	const tabName = getTabName(pathname);
	changeHeaderActiveTab(tabName);
}
/**
 * test the url if has a header item 
 * @param {String} url pathName url
 * @returns {String} the tabname
 */
function getTabName(url) {
	if (url === '/') return url
	const tabs = ['docs', 'community', 'blog'];
	let resp = 'blog';
	tabs.forEach((el) => {
		const regEx = new RegExp(el, 'g');
		resp = regEx.test(url) ? el : resp;
	});
	return resp;
}
/**
 * toggle active class to the header elementes
 * @param {String} name tab name
 */
function changeHeaderActiveTab(name) {
	const newActive = document.querySelector(`.main-header div[name="${name}"]`);
	const prevActive = document.querySelector('.main-header .active');
	prevActive.classList.remove('active');
	newActive.classList.add('active');
}