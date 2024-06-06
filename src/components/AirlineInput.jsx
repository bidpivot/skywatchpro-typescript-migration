import { useEffect, useRef, useState } from "react";

import dataJson from "../json/airlines.json";
import airlineJsonFilter from "../helpers/airlineJsonFilter";

export function AirlineInput({ setValue, value }) {
    const airlineInputRef = useRef(null);
    const resultsContainerRef = useRef(null)
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filtered, setFiltered] = useState(airlineJsonFilter(dataJson));
    const [activeSelection, setActiveSelection] = useState(0);

    useEffect(() => {
        updateValues()
        setActiveSelection(0);
    }, [searchValue]);

    function updateValues() {
      const currVal = airlineInputRef.current.value
      const filteredValues =
      currVal
          ? airlineJsonFilter(dataJson).filter((item) =>
                String(item.Name)
                    .toLowerCase()
                    .includes(String(currVal).toLowerCase())
            )
          : airlineJsonFilter(dataJson);
  setFiltered(filteredValues);
    }

    useEffect(() => {
        function handleClose(e) {
            if (e.target !== airlineInputRef.current) {
                setOpen(false);
            }
        }
        function handleArrows(e) {
          let index;
            switch (e.key) {
                case "ArrowUp":
                    e.preventDefault();
                    setActiveSelection((prevIndex) => {
                      index = prevIndex > 0 ? prevIndex - 1 : prevIndex
                    scrollResultIntoView(index)

                      return index;
                    });

                    break;
                case "ArrowDown":
                    e.preventDefault();

                    setActiveSelection((prevIndex) =>
                    {
                      index = prevIndex < filtered.length - 1 ? prevIndex + 1 : prevIndex
                    scrollResultIntoView(index)

                      return index;
                    });

                    break;
                case "Enter":
                    const activeEl = document.querySelector('.active-result-selection')
                    if (activeEl) {
                      e.preventDefault()
                      activeEl.click()
                      setOpen(false)
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    setOpen(false);
                    break;
                case "Tab":
                    setOpen(false);
                    break;
            }
        }
        document.addEventListener("click", handleClose);
        document.addEventListener("keydown", handleArrows);

        return () => {
            document.removeEventListener("click", handleClose);
            document.removeEventListener("keydown", handleArrows);
        };
    }, [filtered, open, value]);

    const scrollResultIntoView = (index) => {
      if (resultsContainerRef.current && activeSelection !== -1) {
        const highlightedItem = resultsContainerRef.current.childNodes[index];
        highlightedItem.scrollIntoView({block: 'nearest' });
      }
    };

    return (
        <div className="relative">
            <input
                ref={airlineInputRef}
                type="text"
                id="airline-text-input"
                placeholder="Search Airline..."
                onClick={() => {
                  updateValues()
                  searchValue.length >= 1 ? setOpen(true) : ""
                }}
                onInput={(e) => {
                    setSearchValue(e.target.value);
                    setValue('')
                    setOpen(true);
                }}
                className="justify-between airline-search-button bg-transparent border-b-white border-b rounded-none p-2 hover:bg-transparent"
            />
            <div ref={resultsContainerRef} className="bg-white w-full rounded-sm top-[100%] text-black max-h-[300px] overflow-y-scroll absolute">
                {searchValue.length >= 1 &&
                    open &&
                    filtered.map((airline, index) => (
                        <button
                            type="button"
                            className={`cursor-pointer p-4 text-left ${
                                index === activeSelection ? "bg-zinc-400 active-result-selection" : ""
                            }`}
                            key={airline.Code + airline.Name}
                            onClick={() => {
                                setValue((pre) =>
                                    pre === airline.Code ? "" : airline.Code
                                );
                                airlineInputRef.current.value = airline.Name;
                                setOpen(false);
                            }}
                        >
                            {airline.Name}
                        </button>
                    ))}
            </div>
        </div>
    );
}
