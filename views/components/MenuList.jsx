import React from 'react';
const MenuList = ({ items }) => {
	return (
		<>
			{Array.from(items).map((item, index) => {
				return (
					<li
						className='nav-item main-nav rounded-1 d-flex justify-content-center bg-gradient'
						style={{ zIndex: '10' }}
						key={index}>
						<a
							id={`menu-link-${item.name.toLowerCase()}`}
							className='nav-link main-nav-link'
							href={item.url.toLowerCase()}>
							{item.title}
						</a>
					</li>
				);
			})}
		</>
	);
};
export default MenuList;
