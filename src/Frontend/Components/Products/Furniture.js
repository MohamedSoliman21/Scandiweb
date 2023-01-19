import React from "react";

const Furniture = (props) => {
  return (
    <div className="">
      <div className="row">
        <div className="col-10">
          <label htmlFor="Height">Height (CM)</label>
        </div>
        <div className="col-75">
          <input
            type="number"
            min="0"
            id="height"
            value={props.getFurnitureHeight}
            onChange={props.runHandleChange}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <label htmlFor="Width">Width (CM)</label>
        </div>
        <div className="col-75">
          <input
            type="number"
            min="0"
            id="width"
            value={props.getFurnitureWidth}
            onChange={props.runHandleChange}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <label htmlFor="Length">Length (CM)</label>
        </div>
        <div className="col-75">
          <input
            type="number"
            min="0"
            id="length"
            value={props.getFurnitureLength}
            onChange={props.runHandleChange}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
      </div>
      <div className="Notify">
        <p>Please, provide dimensions</p>
      </div>
    </div>
  );
}

export default Furniture