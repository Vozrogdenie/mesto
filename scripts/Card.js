import { оpenPopup } from './index.js';

const picture = document.querySelector('.popup_type_picture');

export class Card {
    constructor(name, link, cardSelector){
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    };

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector).content
        .querySelector('.element').cloneNode(true);
        return cardElement;
    };

    generateCard(){
        this._element = this._getTemplate();
        this._element.querySelector('.element__item').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._setEventListeners();
        return this._element;
    };
  
    _setEventListeners(){
        this._element.querySelector('.element__heart').addEventListener('click', () =>{
          this._handleLikeClick();
        });
        this._element.querySelector('.element__trach').addEventListener('click', () => {
          this._handleTrachPopup();
        });
        this._element.querySelector('.element__item').addEventListener('click', () => {
          this._handleOpenPopup();
        });
    };

    _handleLikeClick(){
        this._element.querySelector('.element__heart').classList.toggle('element__active_heart')
    };
    
    _handleOpenPopup(){
        picture.querySelector('.popup__foto').src = this._link;
        picture.querySelector('.popup__foto').alt = this._name;
        picture.querySelector('.popup__title_type_picture').textContent = this._name;
        оpenPopup(picture);
    };

    _handleTrachPopup(){
        this._element.remove();
    };
};