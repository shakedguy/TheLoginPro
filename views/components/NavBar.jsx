import React from 'react';
const NavBar = ({ title, isLogedIn, userData, content }) => {
	const { style, buttons } = content;

	const { home, menu, profile, login, logout, dark } = buttons;

	return (
		<nav className='navbar navbar-dark bg-gradient' id='main-navbar' style={{ backgroundColor: style.bgColor }}>
			<div className='container-fluid'>
				<div className='d-flex'>
					<button
						className='navbar-toggler add-tooltip'
						type='button'
						data-bs-toggle='offcanvas'
						data-bs-target='#main-menu-canvas'
						aria-expanded='false'
						aria-label='Toggle navigation'
						id='btn-menu'
						aria-controls='main-menu-canvas'
						title={menu.tooltip}>
						<i className={menu.icon}></i>
					</button>
					<a
						type='button'
						className='link-light add-tooltip'
						href={home.href}
						id='nav-btn-home'
						role='button'
						aria-expanded='false'
						data-bs-toggle='tooltip'
						title={home.tooltip}>
						<i className={home.icon}></i>
					</a>
				</div>
				<h2 id='main-title' style={style.title}>
					{title}
				</h2>

				<div className='d-flex align-items-center right-elements'>
					<a
						className='nav-link link-light active add-tooltip'
						data-bs-toggle='tooltip'
						aria-current='page'
						href={userData && userData.Admin ? '/admin' + profile.href : profile.href}
						title={profile.tooltip}>
						{isLogedIn && userData && userData.PhotoURL ? (
							<img
								src={userData.PhotoURL}
								className='rounded-circle'
								alt='user photo'
								width='24'
								height='24'
								loading='lazy'
							/>
						) : (
							<i className={profile.icon}></i>
						)}
					</a>

					<a
						className='nav-link link-light active text-decoration-none add-tooltip navbar-right'
						data-bs-toggle='tooltip'
						type='button'
						id='btn-logout-toast'
						aria-current='page'
						title={isLogedIn ? logout.tooltip : login.tooltip}>
						{isLogedIn ? <i className={logout.icon}></i> : <i className={login.icon}></i>}
					</a>
					<a
						type='button'
						className='nav-link link-light active text-decoration-none add-tooltip navbar-right'
						data-bs-toggle='tooltip'
						id='btn-dark-mode'
						title={dark.tooltip}>
						<i className={dark.icon}></i>
					</a>
				</div>
			</div>
		</nav>
	);
};
export default NavBar;
