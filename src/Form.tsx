import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";

function Form() {
  return (
    <div className="form-page">
      <SearchForm className="w-[90%] max-w-[600px]" />
    </div>
  );
}

export default Form;
