export const localItems = {
	token: '_sT'
};
export const logoutHandler = () => {
	localStorage.clear();
	window.location.href = '/register';
};

export function formatDate(dateString) {
	const date = new Date(dateString);

	const day = date.getUTCDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getUTCFullYear();

	if (!day || !month || !year) return '';
	return `${day} ${month}, ${year}`;
}

export function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const downloadFile = (url) => {
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('target', '_blank');
	document.body.appendChild(link);
	link.click();
	link.remove();
};

export const badgeSelection = (status) => {
	switch (status) {
		case 'Sent':
			return 'warning';
		case 'Unfinished':
			return 'primary';
		case 'Processing':
			return 'info';
		case 'Rejected':
			return 'danger';
		case 'Accepted':
			return 'success';
	}
};
export const viewingBadge = (status) => {
	switch (status) {
		case 'Pending':
			return 'primary';
		case 'Rescheduled':
			return 'info';
		case 'Declined':
			return 'danger';
		case 'Accepted':
			return 'success';
	}
};
export const maintenanceBadge = (status) => {
	switch (status) {
		case 'Pending':
			return 'primary';
		case 'In Progress':
			return 'info';
		case 'Completed':
			return 'success';
	}
};

export const taskBadge = (status) => {
	switch (status) {
		case 'Unfinished':
			return 'danger';
		case 'Needs to completed':
			return 'info';
		case 'Completed':
			return 'success';
	}
};



export function convertToTimeFormat(isoString) {
	const date = new Date(isoString);
  
	// Extract hours and minutes
	let hours = date.getHours();
	let minutes = date.getMinutes();
  
	// Determine AM or PM
	const ampm = hours >= 12 ? 'pm' : 'am';
  
	// Convert to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
  
	// Pad minutes with leading zero if needed
	minutes = minutes < 10 ? '0' + minutes : minutes;
  
	// Return the result
	return hours + ':' + minutes + ' ' + ampm;
  }
  
  export function convertTo24HourFormat(isoString) {
	const date = new Date(isoString);
  
	// Extract hours and minutes
	let hours = date.getHours();
	let minutes = date.getMinutes();
  
	// Pad hours and minutes with leading zero if needed
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
  
	// Return the result
	return hours + ':' + minutes;
  }