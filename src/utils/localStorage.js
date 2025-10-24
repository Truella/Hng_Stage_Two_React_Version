const SESSION_KEY = "ticketapp_session";

export const setSession = (userData) => {
	localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
};

export const getSession = () => {
	const data = localStorage.getItem(SESSION_KEY);
	return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
	localStorage.removeItem(SESSION_KEY);
};
