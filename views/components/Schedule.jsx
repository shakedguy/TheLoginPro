import React from 'react';
const Schedule = () => {
	return (
		<>
			<p className='ms-3 mt-3 mb-1'>
				<strong>Scheduled:</strong>
			</p>
			<div className='form-check form-switch'>
				<input className='form-check-input ms-1' type='checkbox' role='switch' id='schedule-switch' />
				<label className='form-check-label text-black' htmlFor='schedule-switch'>
					Now
				</label>
				<div className='collapse multi-collapse' id='schedule-collapse'>
					<p style={{ margin: '20px 0' }}>When ?</p>
					<div className='form-check'>
						<input className='text-center' id='datePicker' type='datetime-local' />
						<div className='invalid-feedback' id='schedule-feedback'>
							Required
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Schedule;
