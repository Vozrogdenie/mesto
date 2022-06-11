import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import '../pages/index.css';
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Section } from "./Section.js";

import {
    elemConfig,
    buttonOpenPopupEdit,
    popupEditForm,
    buttonOpenPopupNewPlace,
    popupNewPlaceForm,
    popupNameInput,
    popupProfessionInput,
    nameTitle,
    professionSubtitle
} from '../const';


const section = new Section(initialCards, (item) => {
    return new Card(item.name, item.link, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }).generateCard();
}, '.elements');
section.renderItems();

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    nameTitle.textContent = inputs.name;
    professionSubtitle.textContent = inputs.profession;
});
popupEdit.setEventListeners();

const popupNewPlace = new PopupWithForm('.popup_new-place', (inputs) => {
    const card = new Card(inputs.title, inputs.url, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }).generateCard();
    section.addItem(card);
});
popupNewPlace.setEventListeners();

const EditFormValidation = new FormValidator(elemConfig, popupEditForm);
EditFormValidation.enableValidation();
const NewPlaceFormValidation = new FormValidator(elemConfig, popupNewPlaceForm);
NewPlaceFormValidation.enableValidation();

buttonOpenPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
    popupEdit.open();
    
});
buttonOpenPopupNewPlace.addEventListener('click', event => {
    popupNewPlace.open();
});