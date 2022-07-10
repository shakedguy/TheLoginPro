import React from 'react';
const ProfileCard = ({ data }) => {
	const { user, headers } = data;
	return (
		<div id='profile-card' className='card shadow bg-body rounded border-0'>
			{user.PhotoURL && <img src={user.PhotoURL} className='card-img-top' alt='user photo' />}
			{!user.PhotoURL && <img id={user.Name} className='ui-avatar bg-gradient card-img-top' alt='user photo' />}
			<div className='card-body'>
				<ul className='list-group mt-0 pt-0 text-start'>
					{headers.map((header, index) => {
						return (
							<li key={index} className='list-group-item text-start'>
								<p className='text-start'>
									<b className='me-2'>{header}: </b> {String(user[header.replaceAll(' ', '')] || undefined)}
								</p>
							</li>
						);
					})}
				</ul>
				{/* <FloatingActionButton content={buttons.floatingActionButton} /> */}
			</div>
		</div>
	);
};
export default ProfileCard;
