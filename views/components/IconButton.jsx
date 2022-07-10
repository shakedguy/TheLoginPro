import React from 'react';
const IconButton = ({ text, icon, style }) => {
	return (
		<button
			type='button'
			id='refresh-btn'
			style={style}
			className='btn btn-primary text-center'
			onClick={() => window.location.reload()}>
			<i style={icon.style} width={icon.width} height={icon.height} className={icon.name}></i>
			{text}
		</button>
	);
};
export default IconButton;
