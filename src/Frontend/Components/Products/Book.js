import React from "react";

const Book = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-10">
          <label htmlFor="weight">Weight (KG)</label>
        </div>
        <div className="col-75">
          <input
            type="number"
            min="0"
            id="Weight"
            value={props.getBookValue}
            onChange={props.runHandleChange}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
      </div>
      <div className="Notify">
        <p>Please, provide weight</p>
      </div>
    </div>
  );
}

export default Book