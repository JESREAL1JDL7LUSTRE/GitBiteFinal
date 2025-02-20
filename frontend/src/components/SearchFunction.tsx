import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchProps {
  searchQuery: string | null | undefined; // Allow null or undefined values
  onSearch: (query: string) => void;
}

const SearchFunction = ({ searchQuery, onSearch }: SearchProps) => {
  const [query, setQuery] = useState<string>(searchQuery ?? ""); // Ensure `query` is always a string
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Ensure searchQuery is always a string before trimming
  useEffect(() => {
    if (typeof searchQuery === "string") {
      setQuery(searchQuery);
      onSearch(searchQuery.trim()); // ✅ Search immediately when searchQuery changes
    }
  }, [searchQuery, onSearch]); // ✅ Runs whenever `searchQuery` changes

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery.trim()); // ✅ Triggers search instantly on input change
  };

  return (
    <div className="relative">
      <div className="items-center border rounded-md p-1 bg-white shadow-md flex">
        <Search className="w-6 h-6 cursor-pointer" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="p-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchFunction;
