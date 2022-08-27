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
        super.setEventListeners();
        this._popupSelector;
    };
};
