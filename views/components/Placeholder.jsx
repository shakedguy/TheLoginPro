import React from 'react';
const Placeholder = () => {
	return (
		<div class='card' id='placeholder-card' aria-hidden='true'>
			<div class='card-body'>
				<h5 class='card-title placeholder-glow'>
					<span class='placeholder'></span>
				</h5>
				<div class='card-group placeholder-glow' id='placeholder-card-group'>
					<ul className='list-group'>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
						<li className='list-group-item border-0'>
							<a href='#' tabindex='-1' class='btn btn-primary disabled placeholder'></a>
						</li>
					</ul>
				</div>

				{/* <a href='#' tabindex='-1' class='btn btn-primary disabled placeholder col-6'></a> */}
			</div>
		</div>
	);
};
export default Placeholder;

// <span class='placeholder col-7'></span>
// <span class='placeholder col-4'></span>
// <span class='placeholder col-4'></span>
// <span class='placeholder col-6'></span>
// <span class='placeholder col-8'></span>
