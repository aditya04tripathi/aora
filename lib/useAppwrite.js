import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		try {
			const data = await fn();
			setData(data);
			console.log(data, "data");
		} catch (error) {
			setData([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const refetch = () => getData();

	return { data, loading, refetch };
};

export default useAppwrite;
