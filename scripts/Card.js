
//import {cardImg} from '.'

const popupElement = document.querySelectorAll('.popup');
const popupName = document.querySelector('.popup__foto');

export class Card {
    constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
 const cardElement = document
 . querySelector(this._cardSelector).content
 .querySelector('.element').cloneNode(true);

   return cardElement
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__item').src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;
    
    return this._element;
  }
  
  _setEventListeners(){
    this._element.querySelector('.element__heart').addEventListener('click', () =>{
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trach').addEventListener('click', () => {
      this._handleTrachPopup();
    })
    this._element.querySelector('.element__item').addEventListener('click', () => {
      this._handleItemClick();
    })
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup(this._link, this._name);
    });
  }

  _handleLikeClick(){
    this._element.querySelector('.element__heart').classList.toggle('.element__active_heart')
  }
  _handleItemClick(){
    this._cardImg(this._link, this._name);
  }
  _handleOpenPopup(){
    popupName.src = this._link;
    popupElement.classList.add('.popup_opened')
  }

  _handleClosePopup(){
    popupName.src = '';
    popupElement.classList.remove('.popup_opened')
}

_handleTrachPopup(){
  this._element.querySelector('.element__trach').target.closest(".element").remove();
}
}

initialCards.forEach((item) =>{
  const card = new Card(item, '.#element-template"');//или в другое место??
  const cardElement = card.generateCard();
  //ДОБАВЛЕНИЕ В DOM КУДА??
  document.body.append(cardElement);
})
 