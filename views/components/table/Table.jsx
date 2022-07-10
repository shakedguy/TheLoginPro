import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
const Table = ({ users, headers, style }) => {
	return (
		<table
			id='dtBasic'
			className='table table-striped table-bordered display compact table-hover table-auto table-responsive bg-gradient'
			style={{ visibility: 'hidden', ...style }}>
			<TableHeader headers={headers} style={style} />
			<TableBody users={users} headers={headers} style={style} />
		</table>
	);
};
export default Table;
