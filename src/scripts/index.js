import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import '../pages/index.css';

import {
    elemConfig,
    buttonOpenPopupEdit,
    buttonClosePopupEdit,
    popupEditForm,
    buttonOpenPopupNewPlace,
    buttonClosePopupNewPlace,
    popupNewPlaceForm,
    sectionElements,
    picture,
    closeFullPhoto,
    popupNameInput,
    popupProfessionInput,
    popupNewPlaceTitleInput,
    popupNewPlaceUrlInput,
    nameTitle,
    professionSubtitle
} from '../const';
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    nameTitle.textContent = inputs.name;
    professionSubtitle.textContent = inputs.profession;
});
popupEdit.setEventListeners();

const popupNewPlace = new PopupWithForm('.popup_new-place', (inputs) => {
    const card = createCard(inputs.name, inputs.link);
    addNewCard(card);
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

function addNewCard(element) {
    sectionElements.prepend(element);
};

function createCard(name, link) {
    return new Card(name, link, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }).generateCard();
};

initialCards.forEach((card) => {
    const newCard = createCard(card.name, card.link);
    addNewCard(newCard);
});