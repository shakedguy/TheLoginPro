import React from 'react';
const Toast = () => {
	return (
		<div className='position-absolute top-0 end-0 p-3 mt-5 me-1' style={{ zIndex: 1001 }}>
			<div id='logout-toast' className='toast bg-gradient' role='alert' aria-live='assertive' aria-atomic='true'>
				<div className='toast-header d-flex flex-row justify-content-between bg-gradient' id='toast-header'>
					<i className='fas fa-exclamation-triangle text-warning'></i>
					<button
						type='button'
						className='btn-close btn-close-white'
						data-bs-dismiss='toast'
						aria-label='Close'></button>
				</div>
				<div className='toast-body bg-gradient'>
					<p>Are you sure you want to log out?</p>
					<div className='d-flex flex-row justify-content-between'>
						<button
							type='button'
							id='btn-cancel'
							className='btn btn-toast border-0 bg-gradient'
							data-bs-dismiss='toast'
							aria-label='Close'>
							Cancel
						</button>
						<button className='btn btn-toast border-0 bg-gradient' id='btn-logout'>
							Yes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Toast;
