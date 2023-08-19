import { useRouter } from "next/router";
import React, { useState } from "react";

function Searchform() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (searchText == "") {
      return;
    } else {
      router.push(`/search?product=${searchText}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?product=${searchText}`);
    }
  };

  return (
    <div className="relative flex rounded-sm px-2">
      <input
        type="text"
        className="h-8 w-80 pl-4 pr-20 rounded-sm z-0 focus:outline-0 focus:ring-0"
        placeholder="search product..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />
      <div className="absolute top-0 right-0">
        <button
          className="h-8 w-24 flex items-center justify-center  text-slate-900 border border-[#ffc33c] rounded-sm bg-skin-yellow-three "
          onClick={handleSearch}
        >
          <svg
            viewBox="0 0 17.048 18"
            className="h-4 w-4 ltr:mr-2.5 rtl:ml-2.5"
          >
            <path
              d="M380.321,383.992l3.225,3.218c.167.167.341.329.5.506a.894.894,0,1,1-1.286,1.238c-1.087-1.067-2.179-2.131-3.227-3.236a.924.924,0,0,0-1.325-.222,7.509,7.509,0,1,1-3.3-14.207,7.532,7.532,0,0,1,6,11.936C380.736,383.462,380.552,383.685,380.321,383.992Zm-5.537.521a5.707,5.707,0,1,0-5.675-5.72A5.675,5.675,0,0,0,374.784,384.513Z"
              transform="translate(-367.297 -371.285)"
              fill="currentColor"
            ></path>
          </svg>
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchform;
