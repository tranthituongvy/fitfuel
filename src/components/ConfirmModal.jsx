function ConfirmModal ({ isOpen, food, onConfirm, onCancel}){
    if(!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete "{food?.name}"?</p>

            <button onClick={onConfirm}>
              Yes, Delete
            </button>

            <button  onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
    );
}

export default ConfirmModal;