import { Popup } from "./Popup.js";

export class PopupYouSure extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitButton = this._popupSelector.querySelector(".popup__submit-button");
        this._submitHandler = submitHandler;
        this._card;
    };

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._card);
        });
        this._popupSelector.addEventListener('click', this._closeOverlay);
        this._popupSelector.querySelector('button').addEventListener('click', this._closeButton);
    };
};
