interface Props {
  onOpenNowChange: (checked: boolean) => void;
  onPriceChange: (price: number) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const FilterBar: React.FC<Props> = ({
  onOpenNowChange,
  onPriceChange,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="flex items-center gap-4 p-4  border-y-[1px] border-gray-300 mb-6">
      <p className="text-gray-600 ">Filter By:</p>
      <div className="flex items-center gap-2">
        <label className="flex items-center cursor-pointer border-b-[1px] border-gray-300 pb-[2px]">
          <input
            type="checkbox"
            className="hidden peer"
            onChange={(e) => onOpenNowChange(e.target.checked)}
          />
          <span className="h-[14px] w-[14px] border-[1px] border-gray-400 rounded-full peer-checked:bg-gray-400"></span>
          <span className="ml-1 text-gray-700">Open Now</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <select
          className="form-select bg-transparent text-gray-600 min-w-28 border-b-[1px] border-gray-300 pb-[2px]"
          onChange={(e) => onPriceChange(Number(e.target.value))}
        >
          <option value="">All Prices</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <select
          className="form-select bg-transparent min-w-44 text-gray-700 border-b-[1px] border-gray-300 pb-[2px]"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        className={`ml-auto px-10 py-2 border-2 text-gray-500 ${
          !onOpenNowChange && !onPriceChange && !onCategoryChange
            ? "hidden"
            : ""
        }`}
        onClick={() => {
          onOpenNowChange(false);
          onPriceChange(0);
          onCategoryChange("");
        }}
      >
        CLEAR ALL
      </button>
    </div>
  );
};

export default FilterBar;
