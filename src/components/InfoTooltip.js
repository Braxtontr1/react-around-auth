import React from "react";
import successIcon from "../images/success-icon.svg";
import failIcon from "../images/fail-icon.svg";

function InfoTooltip({ isOpen, onClose, status, name }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen && "modal_open"}`}>
      <div className="modal__box">
        <form>
          <button
            className="modal__close-button button"
            type="button"
            onClick={onClose}
          ></button>
          {status === "success" ? (
            <div>
              <img className="modal__icon" src={successIcon} alt="" />
              <p className="modal__status-message">
                Success! You have now been registered.
              </p>
            </div>
          ) : (
            <div>
              <img className="modal__icon" src={failIcon} alt="" />
              <p className="modal__status-message">
                Oops! Something went wrong! Please try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
