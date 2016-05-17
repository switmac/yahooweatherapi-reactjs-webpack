import React from 'react';
import DataEntry from './data-entry';

export default (props) => {
  return (
    <fieldset className="col-xs-12 col-sm-6 col-md-8"  key={props.setName}>
      <legend>{props.setName}</legend>
      <div className="list-group">
        {props.entries.map((data) => {
          return (<DataEntry key={data.label} label={data.label} value={data.value}/>);
        })}
      </div>
    </fieldset>
  );
};
