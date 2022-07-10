import React from 'react';
import NavBar from './NavBar';
import MenuList from './MenuList';
const MainMenu = ({ title, isLogedIn, userData, content }) => {
	const { menu, navbar } = content;
	return (
		<>
			<NavBar title={title} isLogedIn={isLogedIn} userData={userData} content={navbar} />
			<div
				className='offcanvas offcanvas-start rounded-end'
				data-bs-scroll='true'
				tabIndex={-1}
				id='main-menu-canvas'
				aria-labelledby='main-menu-Label'>
				<div className='offcanvas-header'>
					<h5 className='offcanvas-title ms-1' id='main-menu-Label'>
						{menu.title}
					</h5>
					<i className='bi bi-caret-right' id='arrow-forward' data-bs-dismiss='offcanvas' aria-label='Close'></i>
				</div>
				<div className='offcanvas-body '>
					<ul className='navbar-nav' id='main-menu'>
						<MenuList items={menu.items} />
					</ul>
				</div>
			</div>
		</>
	);
};
export default MainMenu;
