import React from "react";

const DVD = (props) => {
  return (
    <div className="">
      <div className="row">
        <div className="col-10">
          <label htmlFor="size">Size (MB)</label>
        </div>
        <div className="col-75">
          <input
            type="number"
            min="0"
            id="size"
            onChange={props.runHandleChange}
            value={props.getDVDValue}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
      </div>
      <div className="Notify">
        <p>Please, provide size</p>
      </div>
    </div>
  );
}

export default DVD