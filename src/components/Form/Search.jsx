import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import api from "../../util/api";

const Search = ({ close }) => {
  const location = useLocation();
  const field = location.pathname;
  const [searchResults, setSearchResults] = useState([]);

  const fetchResults = async (searchValue) => {
    try {
      const res = await (
        await api()
      ).get("/search" + field + "/" + searchValue);
      if (res.status === 200) return res.data;
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const debounce = useCallback((func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }, []);

  const debouncedFetchResults = useCallback(
    debounce((searchValue) => {
      fetchResults(searchValue).then((data) => {
        if (data) {
          setSearchResults(data.results);
        }
      });
    }, 300),
    []
  );

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

      <div className="fixed z-20 flex flex-col items-center justify-center w-1/2 p-4 bg-[#171717] rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer self-end"
          onClick={close}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <div className="flex w-full mt-4">
          <input
            type="text"
            id="search"
            className="flex-grow h-10 p-2 border-2 border-[#27272a] rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => {
              const searchValue = e.target.value;
              if (searchValue.trim() === "") return setSearchResults([]);

              debouncedFetchResults(searchValue);
            }}
          />
        </div>
        <div className="w-full mt-4">
          <h3 className="text-lg font-bold text-white">Results:</h3>
          <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto  rounded-md">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <li
                  key={index}
                  className="p-2 bg-[#272729] rounded-lg text-white"
                >
                  {Object.entries(result).map(([key, value]) => {
                    return (
                      <div key={key} className="mb-2">
                        <span className="font-bold capitalize">{key}:</span>{" "}
                        <span className="text-gray-400">{String(value)}</span>
                      </div>
                    );
                  })}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Search;
