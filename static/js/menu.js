import $ from 'jquery';
import axios from 'axios';
const mainMenu = $('#main-menu');
const mainTitle = $('#main-title');
export const canvas = $('.offcanvas');
export const arrow = $('#arrow-forward');
export const menuBtn = $('#btn-menu');
export let menu = null;

const isAdmin = window.location.pathname.includes('admin');
const getMenuItems = async () => {
	const url = isAdmin ? '/admin' : '';
	const response = await axios.get(url + '/api/menu');
	return response.data;
};

const changeActive = () => {
	const items = $('.main-nav');
	$('.main-nav-link').each((index, link) => {
		if (mainTitle.text().toLowerCase().includes(link.innerHTML.toLowerCase())) {
			items[index].classList.add('main-nav-active');
			link.classList.add('text-light');
		} else {
			items[index].classList.remove('main-nav-active');
			link.classList.remove('text-light');
		}
	});
};

export const displayItems = () => {
	if (mainMenu && menu) {
		$('#main-menu').append(
			Array.from(menu).map((item) => {
				return `<li key=${
					item.Id
				} class="nav-item main-nav rounded-1 d-flex justify-content-center bg-gradient" z-index="10"><a id="menu-link-${item.Key.toLowerCase()}" class="nav-link main-nav-link" href=${
					item.Value
				}>${item.Key}</a></li>`;
			})
		);
		changeActive();
	}
};

const initMenu = async () => {
	// menu = await getMenuItems();
	// const profileURL = Cookies.get('profileURL');
	// if (profileURL) {
	// 	menu[1].Value = profileURL;
	// }
	// displayItems();
};

export default initMenu;
