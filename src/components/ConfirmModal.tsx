interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-emoji">🤔</div>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn modal-btn-yes" onClick={onConfirm}>
            Yes, leave
          </button>
          <button className="modal-btn modal-btn-no" onClick={onCancel}>
            Stay here!
          </button>
        </div>
      </div>
    </div>
  );
}
