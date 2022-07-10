import React from 'react';
import Table from './components/table/Table';
import DefaultLayout from './layouts/default';
import Page from './components/Page';
import IconButton from './components/IconButton';
const Users = ({ isLogedIn, users, userData, content, layout }) => {
	const { title, tableHeaders, footer, style, tableStyle, buttons } = content;
	const { refresh, admin } = buttons;
	return (
		<DefaultLayout title={title} isLogedIn={isLogedIn} userData={userData} content={layout}>
			<Page style={style} id='table-main'>
				<main>
					<div className='card shadow rounded m-0 p-0 w-100 border-0 bg-gradient' id='card-table'>
						<div
							className='card-body text-start align-content-center align-items-center justify-content-center'
							style={{ minHeight: '30rem' }}>
							<div className='d-flex justify-content-center align-self-center' id='table-spinner'>
								<div className='spinner-border' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</div>
							</div>
							<Table users={users} headers={tableHeaders} style={tableStyle} />
						</div>
						<div className='card-footer border-0 d-flex flex-row justify-content-end'>
							<IconButton text={admin.text} icon={admin.icon} style={admin.style} />
							<IconButton text={refresh.text} icon={refresh.icon} style={refresh.style} />
						</div>
					</div>
				</main>
				<footer>
					<p>{footer}</p>
				</footer>
			</Page>
		</DefaultLayout>
	);
};
export default Users;
