import { createContext, useState, useEffect, useContext } from "react";
import { setSession, getSession, clearSession } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(getSession());
	const [isAuthenticated, setIsAuthenticated] = useState(!!getSession());

	const login = (email, password) => {
		if (!email || !password) {
			throw new Error("All fields are required");
		}

		// Retrieve registered users from localStorage
		const storedUsers =
			JSON.parse(localStorage.getItem("ticketapp_users")) || [];

		// Check if user exists with matching email and password
		const existingUser = storedUsers.find(
			(user) => user.email === email && user.password === password
		);

		if (!existingUser) {
			throw new Error("Invalid email or password");
		}

		// Set session for logged-in user
		const sessionUser = {
			email: existingUser.email,
			name: existingUser.name,
			token: "fake_login_token_" + Date.now(),
		};

		localStorage.setItem("ticketapp_session", JSON.stringify(sessionUser));

		// Update app state
		setSession(sessionUser);
		setUser(sessionUser);
		setIsAuthenticated(true);

		// Log success message
		console.log(`Login successful! Welcome, ${existingUser.name}`);
	};

	const signup = ({ email, password, confirmPassword, name }) => {
		// 1. Basic validation
		console.log(email,password,confirmPassword,name)
		if (!email || !password || !confirmPassword || !name) {
			throw new Error("All fields are required");
		}

		if (password !== confirmPassword) {
			throw new Error("Passwords do not match");
		}

		// 2. Retrieve existing users from localStorage
		const storedUsers =
			JSON.parse(localStorage.getItem("ticketapp_users")) || [];

		// 3. Check for duplicate email
		const existingUser = storedUsers.find((user) => user.email === email);
		if (existingUser) {
			throw new Error("Email is already registered");
		}

		// 4. Create new user object
		const newUser = {
			email,
			password, // store plain for simulation; hash in real apps
			name,
			token: "fake_signup_token_" + Date.now(),
		};

		// 5. Save the user to localStorage
		storedUsers.push(newUser);
		localStorage.setItem("ticketapp_users", JSON.stringify(storedUsers));

		// 6. Set session for logged-in user
		localStorage.setItem("ticketapp_session", JSON.stringify(newUser));

		// 7. Update app state
		setSession(newUser);
		setUser(newUser);
		setIsAuthenticated(true);
	};

	const logout = () => {
		clearSession();
		setUser(null);
		setIsAuthenticated(false);
		navigate("/auth/login");
	};

	useEffect(() => {
		if (getSession()) {
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, login, signup, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
