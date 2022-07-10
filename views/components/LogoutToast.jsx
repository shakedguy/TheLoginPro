import React from 'react';
const LogoutToast = () => {
	return (
		<div className='position-absolute top-0 end-0 p-3 mt-5 me-1' style={{ zIndex: '1001' }}>
			<div className='toast' role='alert' aria-live='assertive' aria-atomic='true'>
				<div className='toast-body'>
					Hello, world! This is a toast message.
					<div className='mt-2 pt-2 border-top'>
						<button type='button' className='btn btn-primary btn-sm'>
							Take action
						</button>
						<button type='button' className='btn btn-secondary btn-sm' data-bs-dismiss='toast'>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LogoutToast;
