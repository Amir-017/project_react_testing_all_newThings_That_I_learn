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
  const debouncedQuery = useDebounce(query, 500);
 console.log("debouncedQuery", debouncedQuery);
  useEffect(() => {
    if (debouncedQuery) fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`);
  }, [debouncedQuery]);

  return (
    <div className="">
          <input className="border border-gray-300 rounded-md p-2" value={query} onChange={(e) => setQuery(e.target.value)} />;
    </div>
  )
};