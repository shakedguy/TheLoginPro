import React from 'react';
import DefaultLayout from './layouts/default';
import Page from './components/Page';
const Error = ({ content, layout, isLogedIn, userData }) => {
	const { title, header, style } = content;
	return (
		<DefaultLayout title={title} userData={userData} isLogedIn={isLogedIn} content={layout}>
			<Page style={style}>
				<main>
					<h1 style={header.style}>{header.text}</h1>
					<img src='https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif' />
				</main>
			</Page>
		</DefaultLayout>
	);
};
export default Error;
