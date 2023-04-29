import React from "react";
import "../stylesheets/AgeCalculator.css"
function AgeCalculator (props) {
    return(
        <div className="container">
            <div className="date-inputs">
                <label>Day <input className="date-number" type="number" placeholder="DD" /></label>
                <label>Month <input className="date-number" type="number" placeholder="MM" /></label>
                <label>Year <input className="date-number" type="number" placeholder="YYYY" /></label>
            </div>
            <div className="separator">
                <button className="btn-calcule"></button>
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