// import $ from 'jquery';
// export const tooltipsInit = () => {
// 	if (window.matchMedia('only screen and (min-width: 768px)').matches) {
// 		$('.add-tooltip').tooltip({ placement: 'bottom', trigger: 'hover' });
// 	}
// };

export const tooltipsInit = () => {
	if (window.matchMedia('only screen and (min-width: 768px)').matches) {
		$('[data-bs-toggle="tooltip"]').tooltip({ placement: 'bottom', trigger: 'hover' });
		$('.add-tooltip').tooltip({ placement: 'bottom', trigger: 'hover' });
	}
};
