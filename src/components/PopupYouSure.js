import { Popup } from "./Popup.js";

export class PopupYouSure extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitButton = this._popupSelector.querySelector(".popup__submit-button");
        this._submitHandler = submitHandler;
        this._id;
        this._element;
    };

    open(element, id) {
        super.open();
        this._id = id;
        this._element = element;
    }

    setEventListeners() {
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._element, this._id);
            this.close();
        });
        this._popupSelector.addEventListener('click', this._closeOverlay);
        this._popupSelector.querySelector('button').addEventListener('click', this._closeButton);
    };
};
