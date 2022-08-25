import Api from "./API";
import { api_url, api_auth } from "../utils/constants";

const API = new Api(api_url, api_auth);

export class Card {
    constructor(name, link, owner, id, likes, cardSelector, handleCardClick, handleCardDelete){
        this._name = name;
        this._link = link;
        this._cardOwner = owner;
        this._owner = "57839dde7b0b2444fb58bba3";
        this._id = id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._likes = likes;
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
        this._element.querySelector('.element__heart-count').textContent = this._likes.length;
        if (this._cardOwner !== this._owner) this._element.querySelector(".element__trach").remove();
        this._setEventListeners();
        return this._element;
    };
  
    _setEventListeners(){
        this._element.querySelector('.element__heart').addEventListener('click', () =>{
            this._handleLikeClick();
        });

        if (this._cardOwner === this._owner) {
            this._element.querySelector('.element__trach').addEventListener('click', () => {
                this._handleTrachPopup();
            });
        }
        this._element.querySelector('.element__item').addEventListener('click', () => {
            console.log(this._id)
            this._handleCardClick(this._name, this._link);
        });
    };

    _handleLikeClick() {
        if (this._likes.find(el => el._id === this._owner) !== undefined) {
            API.removeLike(this._id).then(res => {
                this._likes = res.likes;
                this._element.querySelector('.element__heart-count').textContent = res.likes.length;
                this._element.querySelector('.element__heart').classList.remove('element__active_heart')
            });
        } else {
            API.addLike(this._id).then(res => {
                this._likes = res.likes;
                this._element.querySelector('.element__heart-count').textContent = res.likes.length;
                this._element.querySelector('.element__heart').classList.add('element__active_heart')
            });;
        };
    };

    _handleTrachPopup(){
        this._handleCardDelete(this._element, this._id);
    };
};