import React from 'react';
import DefaultLayout from './layouts/default';
import Page from './components/Page';
import ProfileCard from './components/ProfileCard';
const User = ({ isLogedIn, user, userData, content, layout }) => {
	const { title, style, headers, footer } = content;
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData} content={layout}>
			{user && (
				<Page style={style} id={'profile-page'}>
					<ProfileCard data={{ user, headers }} />

					<footer>
						<p>{footer}</p>
					</footer>
				</Page>
			)}
		</DefaultLayout>
	);
};
export default User;
