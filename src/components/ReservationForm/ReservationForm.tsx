import CustomerInterface from "../../models/ICustomer";
import { HEADERS, URL } from "../../config";

import "./ReservationForm.css";
import { useState } from "react";
import Alert from "../Alert/Alert";

interface CustomerProps {
  rvType: "Fifth-Wheel" | "Class-A";
  rvLength: number;
  setIsReservationCompleted: Function;
  isReservationCompleted: boolean;
}

const ReservationForm = (props: CustomerProps) => {
  const [lName, setLName] = useState("null");
  const [fName, setFName] = useState("null");
  const [phone, setPhone] = useState("null");
  const [email, setEmail] = useState("null");
  const [formWasIncomplete, setFormWasIncomplete] = useState(false);
  const [everythingLooksGood, setEverythingLooksGood] = useState(false);

  const reserveNowButtonClick = () => {
    if (
      everythingLooksGood &&
      fName != "null" &&
      lName != "null" &&
      phone != "null" &&
      email != "null"
    ) {
      const newCustomer: CustomerInterface = {
        name: fName + " " + lName,
        rvLength: props.rvLength,
        rvType: props.rvType,
        phone: phone,
        email: email,
      };
      fetch(`${URL}/admin/customer`, {
        method: "POST",
        mode: "cors",
        headers: HEADERS,
        body: JSON.stringify(newCustomer),
      });
      props.setIsReservationCompleted(true);
    } else {
      setFormWasIncomplete(true);
    }
  };
  return (
    <div className="reservation-form-containter">
      <h2>RV Information</h2>
      <div className="reservation-form-inputs">
        <label htmlFor="rvTypeInput">RV Type: </label>
        <br />
        <input
          className="reservation-form-text-input"
          id="rvTypeInput"
          readOnly
          value={props.rvType}
        ></input>
        <br />
        <label htmlFor="rvLengthInput">RV Length: </label>
        <br />
        <input
          className="reservation-form-text-input"
          id="rvLengthInput"
          readOnly
          value={props.rvLength}
        ></input>
      </div>
      <h2>Contact Information</h2>
      <div className="customerInputBox">
        <label htmlFor="fnameInput">First Name: </label>
        <br />
        <input
          className="reservation-form-text-input"
          id="fnameInput"
          onChange={(event) => {
            setFName(event.target.value as any);
          }}
          placeholder="Enter your first name"
        ></input>
        <br />
        <label htmlFor="lnameInput">Last Name: </label>
        <br />
        <input
          className="reservation-form-text-input"
          id="lnameInput"
          onChange={(event) => {
            setLName(event.target.value as any);
          }}
          placeholder="Enter your last name"
        ></input>
        <br />
        <label htmlFor="phoneInput">Phone Number: </label>
        <br />
        <input
          className="reservation-form-text-input"
          id="phoneInput"
          onChange={(event) => {
            setPhone(event.target.value as any);
          }}
          placeholder="Enter your phone number"
        ></input>
        <br />
        <label htmlFor="emailInput">Email: </label>
        <br />
        <input
          className="reservation-form-text-input"
          id="emailInput"
          onChange={(event) => {
            setEmail(event.target.value as any);
          }}
          placeholder="Enter your email address"
        ></input>
      </div>
      <br />
      <div className="reservation-form-everything-looks-good-container">
        <input
          className="reservation-form-checkbox"
          id="everythingLooksGood"
          type="checkbox"
          onChange={(event) => {
            setEverythingLooksGood(event.target.checked as any);
          }}
        ></input>
        <label htmlFor="everythingLooksGood">Everything Looks Good!</label>
      </div>
      {formWasIncomplete &&
      everythingLooksGood === false &&
      props.isReservationCompleted === false ? (
        <Alert
          type="error"
          message="Please confirm reservation info by checking the checkbox above."
        />
      ) : (
        <br />
      )}
      {formWasIncomplete && props.isReservationCompleted === false ? (
        <Alert type="error" message="Please complete all fields." />
      ) : (
        <br />
      )}
      <button className="button reserve-button" onClick={reserveNowButtonClick}>
        Confirm Reservation
      </button>
    </div>
  );
};

export default ReservationForm;
