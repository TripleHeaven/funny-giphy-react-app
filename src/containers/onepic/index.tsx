import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhoneById } from "../actions";
import { connect } from "react-redux";
import { getPhoneById } from "../../selectors";
import * as R from "ramda";
import { addPhoneToBasket } from "../actions";
import BasketCart from "../../components/basketCart";
import { Link } from "react-router-dom";

export default function Pictures(props) {
  //const phone = useSelector(state => getPH)
  const phone = useSelector((state) => getPhoneById(state, state.phonePage.id));
  const dispatch = useDispatch();
  // const phone = useSelector(state => getPhoneById(state, state.phonePage.id));

  useEffect(() => {
    dispatch(fetchPhoneById(props.match.params.id));
    //phone = useSelector(state => getPhoneById(state, state.phonePage.id));

    // dispatchEvent(fetchPhoneById());
  }, []);
  useEffect(() => {
    //dispatch(fetchPhoneById(props.match.params.id));
    //phone = useSelector(state => getPhoneById(state, state.phonePage.id));
    console.log(phone);
    // dispatchEvent(fetchPhoneById());
  }, [phone]);
  const renderFields = () => {
    const { phonetoDraw } = phone;
    const columnFields = R.compose(
      R.toPairs,
      R.pick(["cpu", "camera", "size", "weight", "display", "memory"])
    )(phone);

    return columnFields.map(([key, value]) => (
      <div className="column" key={key}>
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">{value}</div>
      </div>
    ));
  };
  const renderContent = () => {
    const { phoneToRender } = phone;

    return (
      <div className="thumbnail">
        <div className="row">
          <div className="col-md-6">
            <img className="img-thumbnail" src={phone.image} alt={phone.name} />
          </div>
          <div className="col-md-6">{renderFields()}</div>
        </div>
        <div className="caption-full">
          <h4 className="pull-right">${phone.price}</h4>
          <h4>{phone.name}</h4>
          <p>{phone.description}</p>
        </div>
      </div>
    );
  };
  const renderSidebar = () => {
    return (
      <div>
        <p className="lead">Quick shop</p>
        <BasketCart></BasketCart>
        <div className="form-group">
          <h1>{phone.name}</h1>
          <h2>${phone.price}</h2>
        </div>
        <Link to="/" className="btn btn-info btn-block">
          Back to store
        </Link>
        <button
          className="btn btn-succes btn-block"
          type="button"
          onClick={() => dispatch(addPhoneToBasket(phone.id))}
        >
          Add to cart
        </button>
      </div>
    );
  };
  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">{phone && renderContent()}</div>
          <div className="col-md-3">{phone && renderSidebar()}</div>
        </div>
      </div>
    </div>
  );
}
