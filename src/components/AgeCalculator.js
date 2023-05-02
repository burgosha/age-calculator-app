import React from "react";
import { useEffect, useState } from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";
function AgeCalculator (props) {
    // // Obtaining the current date from device
    // const date = new Date();
    // // Current year
    // let currYYYY = date.getFullYear();
    // // Current month
    // let currMM = 1 + date.getMonth();
    // // Current day
    // let currDD = date.getDate();
    // // Total days of each month
    // const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // // Creation of status variables for user inputs
    // const [year, setYear] = useState(0);
    // const [month, setMonth] = useState(0);
    // const [day, setDay] = useState(0);
    // // Method for handling submit
    // const handleSubmit = () => {
    //     setYear(document.getElementById('year').value);
    //     setMonth(document.getElementById('month').value);
    //     setDay(document.getElementById('day').value);
    // }
    // // Conditions and calculus
    // if(day > currDD) {
    //     currDD = currDD + daysOfMonth[currMM - 1];
    //     currMM = currMM - 1;
    // }
    // if(month > currMM) {
    //     currMM = currMM + 12;
    //     currYYYY = currYYYY - 1;
    // }
    // // Results
    // const d = currDD - day;
    // const m = currMM - month;
    // const y = currYYYY - year;

    // Other way!!
    // Actual date
    const actualDate = new Date();
    const actualDateYear = actualDate.getUTCFullYear();
    const actualDateMonth = actualDate.getUTCMonth() + 1;
    const actualDateDay = actualDate.getUTCDate();

    // Hook for user's date of birth
    const [birth, setBirth] = useState({year: "--", month: "--", day: "--" })
    // Handle user's input
    const handleChange = e => {
        // Prevent page reload
        e.preventDefault();
        //Variables
        const y = Number(document.getElementById('year').value);
        const m = Number(document.getElementById('month').value);
        const d = Number(document.getElementById('day').value);
        const monthDays = new Date(y, m, 0).getDate();
        // Check valid date input
        if(d <= monthDays && y < actualDateYear) {
            setBirth({
                ...birth,
                year: y,
                month: m,
                day: d
            })
        } else {
            setBirth({
                ...birth,
                year: "--",
                month: "--",
                day: "--"
            })
            console.log("Ingrese una fecha correcta")
        }
    }
    //Enter keydown control
    useEffect(() => {
        const keyDownHandler = e => {
            if(e.key === 'Enter') {
                e.preventDefault();
                handleChange();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    });
    // Date of Birth
    const dateOfBirth = new Date(birth.year, birth.month, birth.day)
    // Diference between the date of birth and the actual date
    const diff = new Date(Date.now() - dateOfBirth.getTime());
    // Age calculation from difference
    const age = {
        years: Math.abs(diff.getUTCFullYear() - 1970),
        months: Math.abs(diff.getUTCMonth() + 1),
        days: Math.abs(diff.getUTCDate() - actualDateDay)
    }
    // Age correction
    if(age.months === 12) {
        age.years += 1;
        age.months = "0";
    }
    return(
        <div className="container">
            <div className="date-inputs">
                <label>Day <input className="date-number" type="number" placeholder="DD" id="day" name="day" required="required" minLength="1" maxLength="2" /></label>
                <label>Month <input className="date-number" type="number" placeholder="MM" id="month" name="month" required="required" minLength="1" maxLength="2" /></label>
                <label>Year <input className="date-number" type="number" placeholder="YYYY" id="year" name="year" required="required" minLength="4" maxLength="4" /></label>
            </div>
            <div className="caltulate-separator">
                <div className="separator"></div>
                <button className="btn-calculate" type="submit" onClick={handleChange}><img src={ArrowLogo} alt="Arrow logo"/></button>
                <div className="separator"></div>
            </div>
            <div className="results">
                <p className="results-info"><span>{age.years ? age.years : "--"}</span> year</p>
                <p className="results-info"><span>{age.months ? age.months : "--"}</span> months</p>
                <p className="results-info"><span>{age.days ? age.days : "--"}</span> days</p>
            </div>
        </div>
    )
}
export default AgeCalculator;