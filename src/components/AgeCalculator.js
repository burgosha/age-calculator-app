import React from "react";
import { useState } from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";
function AgeCalculator (props) {
    // Obtaining the current date from device
    const date = new Date();
    // Current year
    let currYYYY = date.getFullYear();
    // Current month
    let currMM = 1 + date.getMonth();
    // Current day
    let currDD = date.getDate();
    // Total days of each month
    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Creation of status variables for user inputs
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    // Method for handling submit
    const handleSubmit = () => {
        setYear(document.getElementById('year').value);
        setMonth(document.getElementById('month').value);
        setDay(document.getElementById('day').value);
    }
    // Conditions and calculus
    if(day > currDD) {
        currDD = currDD + daysOfMonth[currMM - 1];
        currMM = currMM - 1;
    }
    if(month > currMM) {
        currMM = currMM + 12;
        currYYYY = currYYYY - 1;
    }
    // Results
    const d = currDD - day;
    const m = currMM - month;
    const y = currYYYY - year;

    return(
        <div className="container">
            <div className="date-inputs">
                <label>Day <input className="date-number" type="number" placeholder="DD" id="day" name="day" required="required" minLength="1" maxLength="2" /></label>
                <label>Month <input className="date-number" type="number" placeholder="MM" id="month" name="month" required="required" minLength="1" maxLength="2" /></label>
                <label>Year <input className="date-number" type="number" placeholder="YYYY" id="year" name="year" required="required" minLength="4" maxLength="4" /></label>
            </div>
            <div className="caltulate-separator">
                <div className="separator"></div>
                <button className="btn-calculate" type="submit" onClick={handleSubmit}><img src={ArrowLogo} alt="Arrow logo"/></button>
                <div className="separator"></div>
            </div>
            <div className="results">
                <p className="results-info"><span>{y}</span> year</p>
                <p className="results-info"><span>{m}</span> months</p>
                <p className="results-info"><span>{d}</span> days</p>
            </div>
        </div>
    )
}
export default AgeCalculator;