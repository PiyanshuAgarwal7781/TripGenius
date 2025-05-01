import React, { useState, useEffect } from "react";

const LocationAutocomplete = ({ onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const apiKey = "29898ad769f247cfbb1c4e683cc56795";

  useEffect(() => {
    const fetchSuggestions = () => {
      if (query.length >= 2) {
        fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => setSuggestions(data.features))
          .catch((error) => {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
          });
      }else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    const selected = suggestion.properties.formatted;
    setSelectedLocation(selected);
    setQuery(selected);
    setSuggestions([]);

    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">What is your destination of choice?</h2>
      {/* user enter the location and gets auto suggestions via form  */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type a location..."
        className="p-2 text-base w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      {/* suggestions div is shown when the suggetion length is greater than zero */}
      <div
        className={`absolute w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-10 ${
          suggestions.length > 0 ? "block" : "hidden"
        }`}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            {suggestion.properties.formatted}
          </div>
        ))}
      </div>
      {/* display selected location */}
      {selectedLocation && (
        <p className="mt-4 text-base text-gray-700">
          Selected Location: <span className="font-medium">{selectedLocation}</span>
        </p>
      )}
    </div>
  );
};

export default LocationAutocomplete;
