import { createContext, useState, useEffect, useContext } from "react";
import { setSession, getSession, clearSession } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const session = getSession();

		if (session) {
			setUser(session);
			setIsAuthenticated(true);
		} else {
			setUser(null);
			setIsAuthenticated(false);
		}

		setLoading(false);
	}, []);

	const login = (email, password) => {
		if (!email || !password) throw new Error("All fields are required");

		const storedUsers =
			JSON.parse(localStorage.getItem("ticketapp_users")) || [];

		const existingUser = storedUsers.find(
			(user) => user.email === email && user.password === password
		);

		if (!existingUser) throw new Error("Invalid email or password");

		const sessionUser = {
			email: existingUser.email,
			name: existingUser.name,
			token: "fake_login_token_" + Date.now(),
		};

		localStorage.setItem("ticketapp_session", JSON.stringify(sessionUser));

		setSession(sessionUser);
		setUser(sessionUser);
		setIsAuthenticated(true);
	};

	const signup = ({ email, password, confirmPassword, name }) => {
		if (!email || !password || !confirmPassword || !name)
			throw new Error("All fields are required");
		if (password !== confirmPassword) throw new Error("Passwords do not match");

		const storedUsers =
			JSON.parse(localStorage.getItem("ticketapp_users")) || [];

		if (storedUsers.find((user) => user.email === email))
			throw new Error("Email is already registered");

		const newUser = {
			email,
			password,
			name,
			token: "fake_signup_token_" + Date.now(),
		};

		storedUsers.push(newUser);
		localStorage.setItem("ticketapp_users", JSON.stringify(storedUsers));
		localStorage.setItem("ticketapp_session", JSON.stringify(newUser));

		setSession(newUser);
		setUser(newUser);
		setIsAuthenticated(true);
	};

	const logout = () => {
		clearSession();
		setUser(null);
		setIsAuthenticated(false);
		navigate("/login");
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, loading, login, signup, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
