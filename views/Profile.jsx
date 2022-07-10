import React from 'react';
import DefaultLayout from './layouts/default';
import FloatingActionButton from './components/FloatingActionButton';
import Page from './components/Page';
import ProfileCard from './components/ProfileCard';
const Profile = ({ userData, isLogedIn, isAlreadyLogedIn, content, layout }) => {
	const { title, style, buttons, headers, footer, notification } = content;
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} content={layout} userData={userData}>
			<Page style={style} id={'profile-page'}>
				{userData && <ProfileCard data={{ user: userData, headers }} />}
				{!userData && (
					<div className='d-flex justify-content-center' style={{ width: '5rem', height: '5rem' }}>
						<div className='spinner-border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</div>
					</div>
				)}
				<footer>
					<p>{footer}</p>
				</footer>
			</Page>

			{isAlreadyLogedIn && (
				<div className='position-absolute bottom-0 end-0 p-2' style={notification.style}>
					<div
						id='already-logged-toast'
						className='toast text-light bg-gradient bg-danger border-0'
						role='alert'
						aria-live='assertive'
						aria-atomic='true'>
						<div
							id='already-logged-toast-header'
							style={notification.header.style}
							className='toast-header text-light bg-gradient bg-danger border-0'>
							<strong className='me-auto'>{notification.header.text}</strong>
							<small style={notification.subHeader.style}>{notification.subHeader.text}</small>
							<button
								type='button'
								className='btn-close btn-close-white'
								data-bs-dismiss='toast'
								aria-label='Close'></button>
						</div>
						<div
							style={notification.body.style}
							className='toast-body bg-gradient bg-danger text-light border-0'
							id='logged-toast-text'>
							{notification.body.text}
						</div>
					</div>
				</div>
			)}
		</DefaultLayout>
	);
};
export default Profile;
