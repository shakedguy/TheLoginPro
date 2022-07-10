import React from 'react';
const Page = ({ style, children, id }) => {
	return (
		<div
			className='container page align-content-center align-items-center justify-content-center d-flex flex-column'
			id={id}
			style={style}>
			{children}
		</div>
	);
};
export default Page;
