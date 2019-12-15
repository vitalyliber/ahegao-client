import React, { Fragment } from "react";
import PropTypes from "prop-types";

function Modal({
  modalTitle,
  onClose,
  onSubmit,
  children,
  visible,
  onSubmitText,
  onCloseText,
  onSubmitVisible,
  onSubmitDisable
}) {
  return (
    <Fragment>
      <div
        className={`modal overflow-auto fade show ${
          visible ? "d-block" : null
        }`}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {onSubmitVisible && (
                <button
                  disabled={onSubmitDisable}
                  onClick={onSubmit}
                  type="button"
                  className="btn btn-primary"
                >
                  {onSubmitText}
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                {onCloseText}
              </button>
            </div>
          </div>
        </div>
      </div>
      {visible && <div className="modal-backdrop fade show" />}
    </Fragment>
  );
}

Modal.propTypes = {
  modalTitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  onSubmitText: PropTypes.string,
  onCloseText: PropTypes.string,
  onSubmitVisible: PropTypes.bool,
  onSubmitDisable: PropTypes.bool
};

Modal.defaultProps = {
  modalTitle: "",
  onSubmitText: "Сохранить",
  onCloseText: "Отмена",
  onSubmitVisible: true,
  onSubmitDisable: false
};

export default Modal;
