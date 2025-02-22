import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import useFetchCategory from "../../utils/Hooks/FetchHooks/useFetchCategory";
  
  interface CategoryDropdownProps {
    setSearchQuery: (query: string) => void; // Accept setSearchQuery as a prop
  }
  
  const CategoryDropdown = ({ setSearchQuery }: CategoryDropdownProps) => {
    const { category, loading, error } = useFetchCategory();
    const categories = Array.from(new Set(category?.map((category) => category.name)));
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 border rounded-md">Category</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select a Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={() => setSearchQuery("")}>All</button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => {
                setSearchQuery(Array.isArray(category) ? category[0] : category); // Ensure it's a string
              }}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CategoryDropdown;
  