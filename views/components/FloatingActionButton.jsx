import React from 'react';
const FloatingActionButton = ({ content }) => {
	const { text, icon, bootstrap, style } = content;
	const { name, width, height } = icon;

	return (
		<button type='button' class='btn btn-primary btn-floating px-3'>
			<i class='fa-duotone fa-plus' aria-hidden='true'></i>
		</button>
	);
};
export default FloatingActionButton;
