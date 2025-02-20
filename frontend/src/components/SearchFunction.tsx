import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchFunction = ({ searchQuery, onSearch }: SearchProps) => {
  const [query, setQuery] = useState<string>(searchQuery || ""); // ✅ Always a string
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery !== query) {
      setQuery(searchQuery || ""); // ✅ Ensure input updates properly
    }
  }, [query, searchQuery]); // ✅ Syncs with category selection

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // ✅ Triggers search immediately
  };

  const handleIconClick = () => {
    const trimmedQuery = query ? query.toString().trim() : ""; // ✅ Ensure it's a string
    onSearch(trimmedQuery); 
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="items-center border rounded-md p-1 bg-white shadow-md flex">
        <Search className="w-6 h-6 cursor-pointer" onClick={handleIconClick} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query} 
          onChange={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && handleIconClick()}
          className="p-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchFunction;
