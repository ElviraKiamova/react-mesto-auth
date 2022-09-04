
function InfoTooltip({ isOpen, onClose, onCloseClick, title, imgStatus }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseClick}>
      <div className="popup__info">
        <img className="popup__status" src={imgStatus} alt={title}/>
        <h2 className="popup__message">{title}</h2>
        <button className="popup__button-cross" type="button" aria-label="Закрыть" onClick={onClose}/>
      </div>
    </div>
  );
}

export default InfoTooltip;