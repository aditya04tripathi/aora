import { getCurrentUser } from "lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

function GlobalProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCurrentUser()
			.then((response) => {
				if (response) {
					setUser(response);
					setIsLoggedIn(true);
				} else {
					setUser(null);
					setIsLoggedIn(false);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoading,
				setIsLoading,
				isLoggedIn,
				setIsLoggedIn,
				user,
				setUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalProvider;
