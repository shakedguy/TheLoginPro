import React, { useState } from 'react';
import DefaultLayout from './layouts/default';
import Page from './components/Page';
const Index = ({ userData, isLogedIn, content, layout }) => {
	const { title, style, buttons, header } = content;
	return (
		<DefaultLayout title={title} userData={userData} isLogedIn={isLogedIn} content={layout}>
			<Page style={style}>
				<header>
					<h3 style={header.style}>{header.text}</h3>
				</header>
				<main>
					<a
						type='button'
						className='btn btn-primary bg-gradient rounded-1'
						style={buttons.login.style}
						data-toggle='modal'
						data-target='#exampleModal'
						href={buttons.login.url}
						id='login-button'>
						{buttons.login.text}
					</a>
				</main>
			</Page>
		</DefaultLayout>
	);
};

export default Index;
