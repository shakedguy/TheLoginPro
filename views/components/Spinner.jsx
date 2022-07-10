import React from 'react';
const Spinner = ({ props }) => {
	const { style } = props;
	return (
		<div className='d-flex justify-content-center align-self-center' id='main-spinner'>
			<div className='spinner-border text-primary' style={style} role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
};
export default Spinner;
