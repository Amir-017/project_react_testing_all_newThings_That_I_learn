import axios from "axios";
import { useEffect, useState } from "react";

export const Component = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query]);

 console.log("data", data?.products);
  return (
    <div className="">
      <input
        className="border border-gray-300 rounded-md p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <h1 className="text-2xl font-bold mb-4">Normal Search</h1>
      <p className="text-gray-700">Search Query: {query}</p>
    </div>
  );
};