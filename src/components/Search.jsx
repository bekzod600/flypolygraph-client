const Search = (props) => {
  function handleSearch(e) {
    // eslint-disable-next-line react/prop-types
    props.setSearchVal(e.target.value);
  }

  return (
    <div className="relative">
      <input
        id="search"
        type="text"
        onChange={handleSearch}
        className="w-full py-1.5 pl-2 pr-8 rounded-lg shadow-md text-gray-600 outline-none"
        placeholder="Qidirish..."
      />
      <label htmlFor="search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
        <i className="fa-solid fa-magnifying-glass"></i>
      </label>
    </div>
  );
};

export default Search;
