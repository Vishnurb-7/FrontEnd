import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const services = [
  "Wedding planning",
  "Personal events",
  "Commercial events",
  "Birthday party",
  "Live music & orchestra",
  "Entertainment shows",
  "Bridal makeup",
  "Photography",
  "Travels",
  "Catering services",
  "Decoration",
  "Security",
];

const SearchBox = () => {

  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    updateSuggestions(e.target.value);
  };
  
  const updateSuggestions = (value) => {
    const matches = services.filter((service) => {
      const regex = new RegExp(`^${value}`, "gi");
      return service.match(regex);
    });
    setSuggestions(matches);
    setHighlightedIndex(matches.length > 0 ? 0 : -1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && highlightedIndex > 0) {
      setHighlightedIndex(highlightedIndex - 1);
    } else if (e.keyCode === 40 && highlightedIndex < suggestions.length - 1) {
      setHighlightedIndex(highlightedIndex + 1);
    } else if (e.keyCode === 13 && highlightedIndex !== -1) {
      navigate(`/providers/${suggestions[highlightedIndex]}`);
      setQuery(suggestions[highlightedIndex]);
      setHighlightedIndex(-1);
      setSuggestions([]);
    }
  };
  
  

  const navigate = useNavigate();

  return (
    <div className="relative ">
        <div className="relative">
      <input
  type="text"
  placeholder="Search for services"
  className="w-56 h-16 py-2 pl-10 pr-4 text-gray-700  bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
  value={query}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
/>


{query.length > 0 && (
  <div className="absolute top-14 left-0 w-full bg-white rounded-md shadow-lg">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className={`p-3 hover:bg-gray-100 cursor-pointer ${
          index === highlightedIndex ? "bg-gray-100" : ""
        }`}
        onClick={() => {
          navigate(`/providers/${suggestion}`);
          setQuery(suggestion);
          setHighlightedIndex(-1);
          setSuggestions([]);
        }}
      >
        {suggestion}
      </div>
    ))}
  </div>
)}


</div>
       </div>
  );
};

export default SearchBox;
