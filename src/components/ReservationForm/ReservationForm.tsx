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
  const [lName, setLName] = useState("");
  const [fName, setFName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [everythingLooksGood, setEverythingLooksGood] = useState(false);

  const reserveNowButtonClick = () => {
    if (
      everythingLooksGood &&
      fName != "" &&
      lName != "" &&
      phone != "" &&
      email != ""
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
    }
  };
  return (
    <div className="reservation-form-containter">
      <h2 className="reservation-form-rv-information">RV Information</h2>
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
        <label htmlFor="rvLengthInput">RV Length in Feet: </label>
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
      {everythingLooksGood === false &&
      props.isReservationCompleted === false ? (
        <Alert
          type="error"
          message="Please confirm reservation info by checking the checkbox above."
        />
      ) : (
        ""
      )}
      {fName === "" ||
      lName === "" ||
      email === "" ||
      phone === "" ? (
        <Alert type="error" message="Please complete all fields." />
      ) : (
        ""
      )}
      <button className="button reserve-button" onClick={reserveNowButtonClick}>
        Confirm Reservation
      </button>
    </div>
  );
};

export default ReservationForm;
