
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AirlineInput } from "./AirlineInput";

export default function SearchForm({className
}) {

    const [airline, setAirline] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log({ airline });
    }, [airline]);

    function handleFormSubmit(event) {
        event.preventDefault();
        if (!airline) {
            alert('Please select an Airline.')
            return
        }
        navigate(`/results/${airline}${flightNumber}`);
    }
    return (
        <div 
        // id="form-container"
        className={"bg-black/30 rounded-sm text-center text-white backdrop-blur-lg p-4 " + className}
        >
                <h1 className="title--lg font-black">SkyWatchPro</h1>
                <hr style={{width: '100%'}}/>

                <form className="form" onSubmit={handleFormSubmit}>
                    <h2 className="title--sm py-6 font-bold text-left">Enter Flight Info</h2>
                    <div className="input-container">
                        <div className="form-line">
                            {/* {
                                <AirlineSelection
                                    value={airline}
                                    setAirline={setAirline}
                                />
                            } */}
                            <AirlineInput setValue={setAirline} value={airline}/>
                        </div>
                        <div className="form-line">
                            <label
                                htmlFor="flightNumber"
                                aria-describedby="input flight number"
                            >
                                <input
                                className="bg-transparent border-b text-white border-b-white rounded-none placeholder:text-white/70"
                                    type="text"
                                    id="flightNumber"
                                    value={flightNumber}
                                    placeholder="Flight Number"
                                    required
                                    onChange={(e) =>
                                        setFlightNumber(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div className="form-line">
                            <span className="search-submit-btn-container">
                                <button
                                    type="submit"
                                    className="bg-black/50 p-4 hover:bg-black/70 transition-colors duration-300 rounded-sm"
                                >
                                    Search
                                </button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
    )
}
