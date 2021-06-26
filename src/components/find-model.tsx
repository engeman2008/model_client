/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { IDelta } from '../interfaces/deltas';

import modelService from '../services/model.service';

const FindModel = () => {
  const [id, setId] = useState('');
  const [jsonValue, setJsonValue] = useState({});
  const [error, setError] = useState('');
  const [deltas, setDeltas] = useState<IDelta[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const idChangedHandler = (event: any) => {
    setId(event.target.value);
  };

  const submitHandler = () => {
    modelService.get(id)
      .then((res) => {
        setJsonValue(res.data.data);
        setError('');
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  const saveDeltasHandler = () => {
    modelService.deltas(id, deltas)
      .then((res) => {
        setSubmitted(true);
        console.log(res);
        setJsonValue(res.data.data);
        setDeltas([]);
        setError('');
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  const Remove = (object: any) => {
    const { namespace, name } = object;

    let path: string = '';
    if (namespace.length !== 0) {
      path = `/${namespace.join('/')}/${name}`;
    } else {
      path = `/${name}`;
    }
    const delta = { op: 'remove', path };
    setDeltas((oldDeltas: IDelta[]) => [...oldDeltas, delta]);
  };

  const Change = (object: any) => {
    const { namespace, name, new_value } = object;
    const path = `/${namespace.join('/')}/${name}`;
    const delta = { op: 'replace', path, value: new_value };
    setDeltas((oldDeltas: IDelta[]) => [...oldDeltas, delta]);
  };

  return (
    // <ReactJson src={data} onEdit={() => {}} onAdd={() => {}} />
    <div className="container">
      <div className="alert alert-warning" role="alert">
        Limitations on UI : Apply Replace then Add then Remove
      </div>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : ''}
      {submitted ? (
        <div className="alert alert-success" role="alert">
          Updated successfully
        </div>
      ) : ''}

      <div>
        <div className="mb-3 row">
          <label htmlFor="" className="col-sm-1 col-form-label">Model Id</label>
          <div className="col-sm-4">
            <input
              className="form-control"
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={idChangedHandler}
              placeholder="Enter model id"
            />
          </div>
          <div className="col-sm-1">
            <button type="submit" onClick={submitHandler} className="btn btn-success"> Find</button>
          </div>
          {id
            ? (
              <div className="col-sm-1">
                <button type="submit" onClick={saveDeltasHandler} className="btn btn-primary"> Save</button>
              </div>
            )
            : ''}
        </div>
        <div className="row">
          <div className="col-sm-8">
            <ReactJson src={jsonValue} onDelete={Remove} onEdit={Change} theme="monokai" />
          </div>
          <div className="col-sm-4">
            <ReactJson src={deltas} theme="monokai" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindModel;
