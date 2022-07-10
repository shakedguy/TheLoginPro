import React from 'react';
const TableBody = ({ users, headers, style }) => {
	return (
		<tbody id='tbody' className='table-text text-center' style={style}>
			{users.map((user, index) => {
				return (
					<tr
						key={user.Id}
						className='table-row justify-content-center'
						id={`table-row-${index}`}
						style={{ cursor: 'pointer' }}>
						<td className='td text-center justify-content-center'>
							<input
								className={`form-check-input table-checkbox ${user.Admin ? 'admin' : 'not-admin'}`}
								type='checkbox'
								value=''
								id={user.Id}
							/>
						</td>
						{headers.map((header, index) => {
							if (header === 'PhotoURL') {
								if (user.PhotoURL) {
									return (
										<td key={index} className='td justify-content-center' style={{ maxWidth: '180px' }}>
											<a className='text-center justify-content-center' href={user.PhotoURL}>
												<i className='bi bi-link m-0 p-0' style={{ fontSize: '20px' }}></i>
											</a>
										</td>
									);
								} else {
									return <td key={index} className='td' style={{ maxWidth: '180px' }}></td>;
								}
							} else if (header === 'Admin') {
								return (
									<td key={index} className='td admins'>
										{user.Admin ? (
											<i
												id={`admin-icon-${user.Id}`}
												className='fas fa-check text-success admin-icons'
												style={{ fontSize: '1.2rem' }}></i>
										) : (
											<i
												id={`admin-icon-${user.Id}`}
												className='fas fa-times text-danger admin-icons'
												style={{ fontSize: '1.2rem' }}></i>
										)}
									</td>
								);
							} else {
								return (
									<td key={index} className='td justify-content-center'>
										{user[header.replaceAll(' ', '')] || ' '}
									</td>
								);
							}
						})}
					</tr>
				);
			})}
		</tbody>
	);
};
export default TableBody;
