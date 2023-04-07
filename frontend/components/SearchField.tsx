import SearchIcon from "@/icons/SearchIcon";

interface ISearchField {}

const SearchField: React.FC<ISearchField> = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-blue-500 "
        placeholder="Search..."
        required
      />
      <button
        type="submit"
        className="absolute right-2.5 bottom-2.5 rounded-lg bg-rose-700 px-4 py-2 text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchField;
