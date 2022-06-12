import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import '../pages/index.css';
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { Section } from "../scripts/Section.js";

import {
    elemConfig,
    buttonOpenPopupEdit,
    popupEditForm,
    buttonOpenPopupNewPlace,
    popupNewPlaceForm,
    popupNameInput,
    popupProfessionInput,
    nameTitle,
    professionSubtitle,
    initialCards
} from '../utils/constants';
import { UserInfo } from "../scripts/UserInfo.js";


const userInfo = new UserInfo();

const section = new Section(initialCards, generateCard, '.elements');
section.renderItems();

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    userInfo.setUserInfo(inputs.name, inputs.profession);
});
popupEdit.setEventListeners();

const popupNewPlace = new PopupWithForm('.popup_new-place', (inputs) => {
    const card = generateCard({ name: inputs.title, link: inputs.url });
    section.addItem(card);
});
popupNewPlace.setEventListeners();

const EditFormValidation = new FormValidator(elemConfig, popupEditForm);
EditFormValidation.enableValidation();
const NewPlaceFormValidation = new FormValidator(elemConfig, popupNewPlaceForm);
NewPlaceFormValidation.enableValidation();

buttonOpenPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  userInfo.getUserInfo().name;
    popupProfessionInput.value = userInfo.getUserInfo().profession;
    popupEdit.open();
});
buttonOpenPopupNewPlace.addEventListener('click', event => {
    popupNewPlace.open();
});

function generateCard(item) {
    return new Card(item.name, item.link, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }).generateCard();
};