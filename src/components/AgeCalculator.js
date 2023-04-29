import React from "react";
import "../stylesheets/AgeCalculator.css"
import ArrowLogo from "../images/icon-arrow.svg";
function AgeCalculator (props) {
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