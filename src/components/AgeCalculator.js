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
    const handleUserSubmit = () => {
        // Prevent page reload
        // e.preventDefault();
        //Variables
        const y = Number(document.getElementById('year').value);
        const m = Number(document.getElementById('month').value);
        const d = Number(document.getElementById('day').value);
        const monthDays = new Date(y, m, 0).getDate();
        // Check valid date input
        if(d <= monthDays && y <= actualDateYear) {
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
                // e.preventDefault();
                handleUserSubmit();
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
    // Age corrections
    if(age.months === 12) {
        age.years += 1;
        age.months = "0";
    }
    else if (age.years && age.months && !age.days) {
         age.days = "0";
    } else if (!age.years && age.months && age.days) {
        age.years = "0";
    } else if (!age.years && age.months && !age.days) {
        age.years = "0"
        age.days = "0";
    }

    //START
    //CALCULATE CURRENT DATE
    const currDate = new Date();
    const currYYYY = currDate.getFullYear();
    const currMM = currDate.getMonth() + 1;
    const currDD = currDate.getDate();
    //HANDLE USER'S BIRTH
    const [userBirth, setUserBirth] = useState({
        year: "--",
        month: "--",
        day: "--"
    });
    const handleChange = (event) => {
        const y = Number(document.getElementById("year").value);
        const m = Number(document.getElementById("month").value);
        const d = Number(document.getElementById("day").value);
        const monthDays = new Date(y, m, 0).getDate();
        if (d <= monthDays && y <= currYYYY) {
            setUserBirth({
                ...userBirth,
                [event.target.name] : event.target.value
            });
        } else {
            setUserBirth({
                ...userBirth,
                year : "--",
                month : "--",
                day : "--"
            });
            // Add toggle visibility
        }
    };
    console.log(userBirth);
    //CALCULATE AGE
    const [userAge, setUserAge] = useState({
        years: "--",
        months: "--",
        days: "--"
    });
    const handleSubmit = (event) => {
        const dob = new Date(userBirth.year, userBirth.month, userBirth.day);
        const diff = new Date(Date.now() - dob.getTime());
        setUserAge({
            ...userAge,
            years : Math.abs(diff.getUTCFullYear() - 1970),
            months : Math.abs(diff.getUTCMonth() + 1),
            days: Math.abs(diff.getUTCDate() - currDD)
        });
    };
    console.log(userAge);
    return(
        <div className="container">
            <div className="date-inputs">
                <label>Day <input className="date-number" type="number" placeholder="DD" id="day" name="day" required="required" minLength="1" maxLength="2" onChange={handleChange} /></label>
                <label>Month <input className="date-number" type="number" placeholder="MM" id="month" name="month" required="required" minLength="1" maxLength="2" onChange={handleChange} /></label>
                <label>Year <input className="date-number" type="number" placeholder="YYYY" id="year" name="year" required="required" minLength="4" maxLength="4" onChange={handleChange} /></label>
            </div>
            <div className="caltulate-separator">
                <div className="separator"></div>
                <button className="btn-calculate" type="submit" onClick={handleSubmit}><img src={ArrowLogo} alt="Arrow logo"/></button>
                <div className="separator"></div>
            </div>
            <div className="results">
                <p className="results-info"><span>{userAge.years ? userAge.years : userAge.years === 0 ? userAge.years : "--"}</span> year</p>
                <p className="results-info"><span>{userAge.months ? userAge.months : userAge.months === 0 ? userAge.months : "--"}</span> months</p>
                <p className="results-info"><span>{userAge.days ? userAge.days : userAge.days === 0 ? userAge.days : "--"}</span> days</p>
            </div>
        </div>
    )
}
export default AgeCalculator;