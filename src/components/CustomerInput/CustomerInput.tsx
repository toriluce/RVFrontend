interface CustomerProps {
    rvType: "Fifth-Wheel" | "Class-A";
    rvLength: number;
  }

const CustomerInput = (props: CustomerProps) => {
    
    return (
      <div className="customerInputBox">
        <h3>RV Information</h3>

        <label htmlFor="rvTypeInput">RV Type: </label>
        <input id="rvTypeInput" readOnly value={props.rvType}></input>
        <br />
        <label htmlFor="rvLengthInput">RV Type: </label>
        <input id="rvLengthInput" readOnly value={props.rvLength}></input>

        <h3>Contact Information</h3>
        <label htmlFor="fnameInput">First Name: </label>
        <input id="fnameInput"></input>
        <br />
        <label htmlFor="lnameInput">Last Name: </label>
        <input id="lnameInput"></input>
        <br />
        <label htmlFor="phoneInput">Phone Number: </label>
        <input id="phoneInput"></input>
        <br />
        <label htmlFor="emailInput">Email Address: </label>
        <input id="emailInput"></input>
      </div>
    );
}

export default CustomerInput;
