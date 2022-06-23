import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import '../pages/index.css';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";

import {
    elemConfig,
    buttonOpenPopupEdit,
    popupEditForm,
    buttonOpenPopupNewPlace,
    popupNewPlaceForm,
    popupNameInput,
    popupProfessionInput,
    initialCards,
    

} from '../utils/constants';
import { UserInfo } from "../components/UserInfo.js";


const userInfo = new UserInfo();

const section = new Section(initialCards, generateCard, '.elements');
section.renderItems();

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    userInfo.setUserInfo(inputs.name, inputs.profession);
});
popupEdit.setEventListeners();
popupPicture.setEventListeners();

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
    EditFormValidation._disableSubmitButton(EditFormValidation._button);
});
buttonOpenPopupNewPlace.addEventListener('click', event => {
    popupNewPlace.open();
    NewPlaceFormValidation._disableSubmitButton(NewPlaceFormValidation._button);

});

function generateCard(item) {
    return new Card(item.name, item.link, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }).generateCard();
};