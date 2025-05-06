const Modal = ({ onCloseModal, onConfirmDelete }) => {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <p className="modal-content-title">
            Are you sure to delete this article?
          </p>
          <div className="modal-buttons">
            <button
              className="modal-button"
              onClick={() => onCloseModal(false)}
            >
              No
            </button>
            <button
              className="modal-button delete-confirm active"
              onClick={() => onConfirmDelete(true)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
