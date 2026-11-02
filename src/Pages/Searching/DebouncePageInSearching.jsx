import { useEffect, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); 
  }, [value, delay]);

  return debounced;
}
export const Component = () => {
   const [query, setQuery] = useState("");
   const [data, setData] = useState(null);
  const debouncedQuery = useDebounce(query, 500);

const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (debouncedQuery) fetchData();
  }, [debouncedQuery]);
  console.log("data", data?.products);
  return (
    <div className="">
          <input className="border border-gray-300 rounded-md p-2" value={query} onChange={(e) => setQuery(e.target.value)} />;
            <h1 className="text-2xl font-bold mb-4">Debounced Search</h1>
            <p className="text-gray-700">Search Query: {query}</p>
            <p className="text-gray-700">Debounced Query: {debouncedQuery}</p>
    </div>
  )
};