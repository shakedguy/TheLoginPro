import React from 'react';
import MainMenu from '../components/MainMenu';
import Toast from '../components/Toast';
const DefaultLayout = ({ title, isLogedIn, userData, children, content }) => {
	return (
		<html lang='en'>
			<head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='color-scheme' content='light dark' />
				<link rel='icon' type='image/x-icon' href='./assets/favicon.ico' />
				<title>{title}</title>

				<script
					src='https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.6.4/dayjs.min.js'
					integrity='sha512-IKOXNA0P3ih6UOEA5pN0RgOZFY9wkb5wA0jsRqB771uIooevsSSSQ3AH3KbQjwZeVSLWbXCNB9KIJksoaUfgrg=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'></script>

				<link rel='stylesheet' href='./css/main.css' />

				<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' />

				<link
					rel='stylesheet'
					type='text/css'
					href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css'
				/>
				<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' />
				<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
				<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' rel='stylesheet' />
				<link
					href='https://fonts.googleapis.com/css2?family=Dosis&family=Poiret+One&family=Raleway:wght@300&display=swap'
					rel='stylesheet'
				/>
				<link
					type='text/css'
					rel='stylesheet'
					href='https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.css'
				/>

				<link
					rel='stylesheet'
					type='text/css'
					href='https://cdn.datatables.net/v/bs5/jq-3.6.0/jszip-2.5.0/dt-1.11.5/af-2.3.7/b-2.2.2/b-colvis-2.2.2/b-html5-2.2.2/b-print-2.2.2/cr-1.5.5/date-1.1.2/fc-4.0.2/fh-3.2.2/kt-2.6.4/r-2.2.9/rg-1.1.4/rr-1.2.8/sc-2.0.5/sb-1.3.2/sp-2.0.0/sl-1.3.4/sr-1.1.0/datatables.min.css'
				/>
				<link
					rel='stylesheet'
					type='text/css'
					href='https://cdn.datatables.net/select/1.4.0/css/select.dataTables.min.css'
				/>

				<script
					type='text/javascript'
					src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/js/bootstrap.bundle.min.js'></script>

				<script
					type='text/javascript'
					src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js'></script>
				<script
					type='text/javascript'
					src='https://cdn.datatables.net/v/bs5/jq-3.6.0/jszip-2.5.0/dt-1.11.5/af-2.3.7/b-2.2.2/b-colvis-2.2.2/b-html5-2.2.2/b-print-2.2.2/cr-1.5.5/date-1.1.2/fc-4.0.2/fh-3.2.2/kt-2.6.4/r-2.2.9/rg-1.1.4/rr-1.2.8/sc-2.0.5/sb-1.3.2/sp-2.0.0/sl-1.3.4/sr-1.1.0/datatables.min.js'></script>

				<script src='./js/bundle.js' defer></script>
			</head>
			<body>
				<MainMenu title={title} content={content} isLogedIn={isLogedIn} userData={userData} />
				{children}
			</body>

			{isLogedIn && <Toast />}
		</html>
	);
};

export default DefaultLayout;
