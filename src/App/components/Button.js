import React from "react";

function Button(props) {
  return (
    <button className={props.type} id={props.id} onClick={props.event}>
      {props.inner}
    </button>
  );
}

export default Button;
