import React from 'react';
const TableHeader = ({ headers, style }) => {
	return (
		<thead className='table-headers text-center' style={style}>
			<tr id={'dt-header'} style={style}>
				<th
					className='th text-center justify-content-center align-items-center align-content-center'
					style={{ minWidth: '30px', justifyItems: 'center', justifyContent: 'center' }}
					key={-1}></th>
				{headers.map((header, index) => {
					if (index === 0) {
						return (
							<th className='th text-center' key={index}>
								{header}
							</th>
						);
					}
					return (
						<th className='th text-center' key={index}>
							{header}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};
export default TableHeader;
