import React from 'react';

export default (props) => {
  return (
    <div className="data-entry list-group-item">
      <label className="col-md-4">{props.label}</label>
      <span className="value">{props.value}</span>
    </div>
  );
}