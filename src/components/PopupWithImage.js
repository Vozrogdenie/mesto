import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__foto');
        this._title = this._popupSelector.querySelector('.popup__title');
    };

    open(name, link) {
        super.open();
        this._image.src = link;
        this._title.textContent = name;
        this._image.alt = name;
    };
};