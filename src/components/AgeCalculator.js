import React from "react";
import { useEffect, useState } from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";

function isValidDate(day, month, year) {
    const date= newDate(year, month - 1, day);
    return(
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function AgeCalculator (props) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [age, setAge] = useState ("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isValidDate(day, month, year)) {
            setAge(calculateAge(day,month, year));
        } else {
            alert("Fecha invalida.");
        }
    };
    // //START
    // //CALCULATE CURRENT DATE
    // const currDate = new Date();
    // const currYYYY = currDate.getUTCFullYear();
    // // const currMM = currDate.getUTCMonth() + 1;
    // const currDD = currDate.getUTCDate();
    // //HOOKS
    // const [userBirth, setUserBirth] = useState({
    //     year: "--",
    //     month: "--",
    //     day: "--"
    // });
    // const [userAge, setUserAge] = useState({
    //     years: "--",
    //     months: "--",
    //     days: "--"
    // });
    // const [errors, setErrors] = useState({invalidDay: false, invalidMonth: false, invalidYear: false, invalideDate: false})
    // //HANDLE USER'S BIRTH
    // const handleChange = (event) => {
    //     const y = Number(document.getElementById("year").value);
    //     const m = Number(document.getElementById("month").value);
    //     const d = Number(document.getElementById("day").value);
    //     const monthDays = new Date(y, m, 0).getDate();
    //     if (d <= monthDays && y <= currYYYY && m < 12) {
    //         setUserBirth({
    //             ...userBirth,
    //             [event.target.name] : event.target.value
    //         });
    //     } else {
    //         setUserBirth({
    //             ...userBirth,
    //             [event.target.name] : "--"
    //         });
    //         setUserAge({
    //             ...userAge,
    //             years: "--",
    //             months: "--",
    //             days: "--"
    //         })
    //         // Add toggle visibility
    //         if(monthDays < d) {
    //             setErrors({invalidDay: true})
    //         } else if (12 < m) {
    //             setErrors({invalidMonth: true})
    //         } else if (currYYYY < y) {
    //             console.log("Must be in the past")
    //         }
    //     }
    // };
    // //HANDLE SUBMIT - CALCULATE AGE
    // const handleSubmit = () => {
    //     const dob = new Date(userBirth.year, userBirth.month, userBirth.day);
    //     const diff = new Date(Date.now() - dob.getTime());
    //     if(Math.abs(diff.getUTCMonth() + 1) < 12) {
    //         setUserAge({
    //             ...userAge,
    //             years : Math.abs(diff.getUTCFullYear() - 1970),
    //             months : Math.abs(diff.getUTCMonth() + 1),
    //             days: Math.abs(diff.getUTCDate() - currDD)
    //         });
    //     } else if (Math.abs(diff.getUTCMonth() + 1) === 12 && Number(userBirth.year) !== Number(currYYYY)) {
    //         setUserAge({
    //             ...userAge,
    //             years : Math.abs(diff.getUTCFullYear() - 1970) + 1,
    //             months : 0,
    //             days: Math.abs(diff.getUTCDate() - currDD)
    //         });
    //     } else if (Math.abs(diff.getUTCMonth() + 1) === 12 && Number(userBirth.year) === Number(currYYYY)) {
    //         setUserAge({
    //             ...userAge,
    //             years: 0,
    //             months: 0,
    //             days: Math.abs(diff.getUTCDate() - currDD)
    //         })
    //     }
    // };
    // //OTHER CONTROLS
    // useEffect(() => {
    //     const keyDownHandler = e => {
    //         if(e.key === 'Enter') {
    //             handleSubmit();
    //         }
    //     };
    //     document.addEventListener('keydown', keyDownHandler);
    //     return () => {
    //         document.removeEventListener('keydown', keyDownHandler);
    //     }
    // });

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="date-inputs">
                <label>Day <input className={!errors.invalidDay ? "date-number" : "date-number error"} type="number" placeholder="DD" id="day" name="day" required="required" minLength="1" maxLength="2" onChange={handleChange} />{ errors.invalidDay ? <span className="error-type">Must be a valid day</span> : "" }</label>
                <label>Month <input className={!errors.invalidMonth ? "date-number" : "date-number error"} type="number" placeholder="MM" id="month" name="month" required="required" minLength="1" maxLength="2" onChange={handleChange} />{ errors.invalidMonth ? <div className="error-type">Must be a valid month</div> : "" }</label>
                <label>Year <input className="date-number" type="number" placeholder="YYYY" id="year" name="year" required="required" minLength="4" maxLength="4" onChange={handleChange} /></label>
            </div>
            <div className="caltulate-separator">
                <div className="separator"></div>
                <button className="btn-calculate" type="submit" onClick={handleSubmit}><img src={ArrowLogo} alt="Arrow logo"/></button>
                <div className="separator"></div>
            </div>
            </form>
            <div className="results">
                <p className="results-info"><span>{userAge.years ? userAge.years : userAge.years === 0 ? userAge.years : "--"}</span> years</p>
                <p className="results-info"><span>{userAge.months ? userAge.months : userAge.months === 0 ? userAge.months : "--"}</span> months</p>
                <p className="results-info"><span>{userAge.days ? userAge.days : userAge.days === 0 ? userAge.days : "--"}</span> days</p>
            </div>
        </div>
    )
}
export default AgeCalculator;