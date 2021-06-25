/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState } from 'react';
import ReactJson from 'react-json-view';

import modelService from '../services/model.service';

const CreateModel = () => {
  const [jsonText, setJsonText] = useState('');
  const [jsonValue, setJsonValue] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [id, setId] = useState();

  const jsonChangedHandler = (event: any) => {
    setJsonText(event.target.value);
    if (jsonText) {
      setJsonValue(JSON.parse(event.target.value));
    } else {
      setJsonValue({});
    }
  };

  const submitHandler = () => {
    modelService.create(JSON.parse(jsonText))
      .then((res) => {
        setSubmitted(true);
        console.log(res);
        setId(res.data.data._id);
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    // <ReactJson src={data} onEdit={() => {}} onAdd={() => {}} />
    <div className="container">
      {error ? (
        <div className="alert alert-danger" role="alert">
          error
        </div>
      ) : ''}
      {submitted ? (
        <div className="alert alert-primary" role="alert">
          Added successfully with id
          {id}
        </div>
      ) : ''}
      {(!error && !submitted)
        ? (
          <div>
            <button type="submit" onClick={submitHandler} className="btn btn-success" style={{ marginBottom: '10px' }}> Submit</button>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="json"
                    name="json"
                    value={jsonText}
                    onChange={jsonChangedHandler}
                    placeholder="Type your json here.."
                  />
                </div>
              </div>
              <div className="col-md-6">
                <ReactJson src={jsonValue} theme="monokai" />
              </div>
            </div>
          </div>
        )
        : ''}
    </div>
  );
};

export default CreateModel;
