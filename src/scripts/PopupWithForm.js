import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    };

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(this._getInputValues())
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    };

    close() {
        this._form.reset();
        super.close();
    };
};