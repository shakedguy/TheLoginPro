import React from 'react';
const MailingList = () => {
	return (
		<div className='input-group flex-column mb-1' id='contacts-list'>
			<div className='d-flex justify-content-center' id='mailing-list-spinner'>
				<div className='spinner-border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	);
};
export default MailingList;
