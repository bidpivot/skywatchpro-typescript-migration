import "./App.css";
// dynamically import findAirline.js
import SearchForm from "./components/SearchForm";

export default function Form(props) {

    return (
        <div className="form-page">
           <SearchForm className="w-[90%] max-w-[600px]"/>
        </div>
    );
}
