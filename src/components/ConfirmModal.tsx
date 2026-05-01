import { useTranslation } from 'react-i18next';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ message, onConfirm, onCancel }: Props) {
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-emoji">🤔</div>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn modal-btn-yes" onClick={onConfirm}>
            {t('confirmYes')}
          </button>
          <button className="modal-btn modal-btn-no" onClick={onCancel}>
            {t('confirmNo')}
          </button>
        </div>
      </div>
    </div>
  );
}
