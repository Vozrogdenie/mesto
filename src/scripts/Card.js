export class Card {
    constructor(name, link, cardSelector, handleCardClick){
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
          this._handleCardClick(this._name, this._link);
        });
    };

    _handleLikeClick(){
        this._element.querySelector('.element__heart').classList.toggle('element__active_heart')
    };

    _handleTrachPopup(){
        this._element.remove();
    };
};