import React from "react";
import { useState } from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";

function AgeCalculator() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [age, setAge] = useState("");
  
    const isValidDate = (day, month, year) => {
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    };
  
    const calculateAge = (day, month, year) => {
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();
  
      if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
        if (ageDays < 0) {
          const monthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
          ageDays += monthDays;
          ageMonths--;
        }
      } else if (ageMonths > 0 && ageDays < 0) {
        const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const prevMonthDays = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
        ageDays += prevMonthDays;
        ageMonths--;
      }
  
      return {
        years: ageYears,
        months: ageMonths,
        days: ageDays,
      };
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setAge(calculateAge(day, month, year));
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
                <label
                  className={
                    (((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear()))) ||
                    ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
                    ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
                    ? 
                    "label-error"  :
                    ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear())) 
                    ? "label-error"
                    : "" 
                  }
                >Day
                  <input 
                  className={
                    (((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear()))) ||
                    ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
                    ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
                    ? 
                    "date-number error"  :
                    ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear())) 
                    ? "date-number error"
                    : "date-number"
                  } 
                  type="number" 
                  placeholder="DD" 
                  id="day" 
                  name="day" 
                  required="required" 
                  value={day} 
                  onChange={(event) => setDay(parseInt(event.target.value))}
                  />
                  {(((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear()))) ||
                  ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
                  ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
                  ? 
                  <span className="error-type">Must be a valid day</span>  :
                  ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear())) 
                  ? <span className="error-type">Must be a valid date</span>
                  : ""}
                </label>
                <label>Month
                  <input 
                  className="date-number" 
                  type="number" 
                  placeholder="MM" 
                  id="month" 
                  name="month" 
                  required="required" 
                  minLength="1" 
                  maxLength="2" 
                  value={month} 
                  onChange={(event) => setMonth(parseInt(event.target.value))} 
                  />
                  {((!(day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear()))) ||
                  ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
                  (!(day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
                  ? <span className="error-type">Must be a valid month</span> 
                  : ""}                  
                </label>
                <label>Year
                  <input className="date-number"
                  type="number" 
                  placeholder="YYYY" 
                  id="year" 
                  name="year" 
                  required="required" 
                  minLength="4" 
                  maxLength="4" 
                  value={year} 
                  onChange={(event) => setYear(parseInt(event.target.value))} 
                  />
                  {((!(day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))) ||
                  (!(day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear())) ||
                  ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
                  ? <span className="error-type">Must be in the past</span> : ""}
                </label>
            </div>
            <div className="caltulate-separator">
                <div className="separator">
                </div>
                <button 
                className="btn-calculate" 
                type="submit">
                  <img src={ArrowLogo} alt="Arrow logo"/>
                </button>
                <div className="separator"></div>
            </div>
            </form>
            <div className="results">
                <p className="results-info"><span>{age ? age.years : "--"}</span> years</p>
                <p className="results-info"><span>{age ? age.months : "--"}</span> months</p>
                <p className="results-info"><span>{age ? age.days : "--"}</span> days</p>
            </div>
        </div>
    )
}
export default AgeCalculator;