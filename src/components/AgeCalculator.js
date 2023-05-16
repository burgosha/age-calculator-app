import React from "react";
import { useState } from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";

function AgeCalculator() {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [age, setAge] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const isValidDate = (day, month, year) => {
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    };

    const isInvalidDate = (
      (day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear())
    )
    const isInvalidDay = (
      ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
      ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
      ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
    )

    const isInvalidMonth = (
      (!(day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
      ((day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && !(year && year > new Date().getFullYear())) ||
      (!(day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
    )

    const isInvalidYear = (
      ((!(day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))) ||
      (!(day && (day < 1 || day > 31)) && (month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear())) ||
      ((day && (day < 1 || day > 31)) && !(month && (month < 1 || month > 12)) && (year && year > new Date().getFullYear()))
    )

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
      setFormSubmitted(true);
      if(isValidDate(day, month, year)) { 
        setAge(calculateAge(day, month, year));
      }
    };

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="date-inputs">
                <label
                  style={{ color: isInvalidDay || isInvalidDate ? "#FF5959" : "" }}
                >Day
                  <input 
                  className={ isInvalidDay || isInvalidDate ? "date-number error" : "date-number" } 
                  type="number" 
                  placeholder="DD" 
                  id="day" 
                  name="day" 
                  required="required" 
                  value={day} 
                  onChange={(event) => setDay(parseInt(event.target.value))}
                  />
                  {isInvalidDay ? 
                  <span className="error-type">Must be a valid day</span>  :
                  isInvalidDate 
                  ? <span className="error-type">Must be a valid date</span>
                  : ""}
                </label>
                <label
                  style={{color: isInvalidMonth || isInvalidDate ? "#FF5959" : "" }}
                >Month
                  <input 
                  className={ isInvalidMonth || isInvalidDate ? "date-number error" : "date-number" } 
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
                  { isInvalidMonth
                  ? <span className="error-type">Must be a valid month</span> 
                  : ""}                  
                </label>
                <label
                  style={{ color: isInvalidYear || isInvalidDate ? "#FF5959" : "" }}
                >Year
                  <input className={ isInvalidYear || isInvalidDate ? "date-number error" : "date-number" }
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
                  { isInvalidYear
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