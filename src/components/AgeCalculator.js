import React from "react";
import { useState } from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";
function AgeCalculator (props) {
    // Obtaining the current date of the computer
    const date = new Date();
    // Current year
    const currYYYY = date.getFullYear();
    // Current month
    const currMM = 1 + date.getMonth();
    // Current day
    const currDD = date.getDate();
    // Total days of each month
    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Creation of status variables for user inputs
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);

    return(
        <div className="container">
            <div className="date-inputs">
                <label>Day <input className="date-number" type="number" placeholder="DD" /></label>
                <label>Month <input className="date-number" type="number" placeholder="MM" /></label>
                <label>Year <input className="date-number" type="number" placeholder="YYYY" /></label>
            </div>
            <div className="caltulate-separator">
                <div className="separator"></div>
                <button className="btn-calculate"><img src={ArrowLogo} alt="Arrow logo"/></button>
                <div className="separator"></div>
            </div>
            <div className="results">
                <p className="results-info"><span>38</span> year</p>
                <p className="results-info"><span>3</span> months</p>
                <p className="results-info"><span>26</span> days</p>
            </div>
        </div>
    )
}
export default AgeCalculator;