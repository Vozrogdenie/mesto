export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    };
  
    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._escapePopup);
    };
  
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escapePopup);
    };

    setEventListeners(){
        this._popupSelector.addEventListener('click', this._closeOverlay);
        this._popupSelector.querySelector('button').addEventListener('click', this._closeButton);
    }

    _escapePopup = (event) => {
        if (event.code === 'Escape') {
            this.close();
        };
    };
  
    _closeOverlay = (event) => {
        if (event.target === event.currentTarget) {
            this.close();
        };
    };

    _closeButton = (event) => {
        this.close();
    };
};