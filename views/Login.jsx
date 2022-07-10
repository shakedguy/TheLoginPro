import React from 'react';
import DefaultLayout from './layouts/default';
import Page from './components/Page';
import Spinner from './components/Spinner';
const Login = ({ isLogedIn, content, layout }) => {
	const { title, style, spinner, header } = content;

	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} content={layout}>
			<Page style={style}>
				<header className='header-login'>
					<h3 style={header.style}>{header.text}</h3>
				</header>
				<main className='main-login border-1 rounded-1'>
					<Spinner props={spinner} />
					<div id='firebaseui-auth-container'></div>
				</main>
			</Page>
		</DefaultLayout>
	);
};
export default Login;
