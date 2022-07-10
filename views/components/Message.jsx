import React from 'react';
const Message = () => {
	return (
		<>
			<p className='ms-3 mt-3 mb-1'>
				<strong> Message:</strong>
			</p>
			<div className='form-check form-switch mb-3'>
				<input className='form-check-input ms-1' type='checkbox' role='switch' id='message-switch' />
				<label className='form-check-label ms-2 text-black' htmlFor='message-switch'>
					Default
				</label>
			</div>
			<div className='collapse multi-collapse mb-1' id='message'>
				<div className='form-floating mb-3 collapse multi-collapse' id='subject-container'>
					<input type='text' className='form-control' id='subject' placeholder='Subject' />
					<label className='mb-3' htmlFor='subject'>
						Subject
					</label>
				</div>
				<div className='form-floating mb-3' id='message-container'>
					<textarea
						className='form-control mt-3'
						id='message-input'
						rows='3'
						placeholder='Enter your message here'
						required></textarea>
					<label className='mb-3' htmlFor='message-input'>
						Enter your message here
					</label>
					<div className='invalid-feedback mb-1' id='message-feedback-id'>
						Message cannot be empty
					</div>
				</div>
			</div>
		</>
	);
};
export default Message;
