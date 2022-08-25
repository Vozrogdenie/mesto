import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import '../pages/index.css';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupYouSure } from "../components/PopupYouSure.js";
import { Section } from "../components/Section.js";
import {
    elemConfig,
    buttonOpenPopupEdit,
    popupEditForm,
    buttonOpenPopupNewPlace,
    popupNewPlaceForm,
    popupNameInput,
    popupProfessionInput,
    api_url,
    api_auth,
    changeAvatarButton,
} from '../utils/constants';
import { UserInfo } from "../components/UserInfo.js";
import Api from "../components/API.js";

const API = new Api(api_url, api_auth);
const userInfo = new UserInfo();
let section;
API.getApiCards().then(res => {
    section = new Section(res, generateCard, '.elements');
    section.renderItems();
});
API.getApiUsers().then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
})

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    popupEdit.handleSaving();
    API.setApiUsers(inputs.name, inputs.profession).then(() => {
        userInfo.setUserInfo(inputs.name, inputs.profession);
        popupEdit.handleSaved();
    });
});
popupEdit.setEventListeners();
popupPicture.setEventListeners();

const popupNewPlace = new PopupWithForm('.popup_new-place', (inputs) => {
    popupNewPlace.handleSaving();
    API.createCards({ name: inputs.title, link: inputs.url }).then(newCard => {
        const card = generateCard({ name: inputs.title, link: inputs.url, owner: { _id: newCard.owner._id }, _id: newCard._id, likes: newCard.likes });
        section.addItem(card);
        popupNewPlace.handleSaved(); 
    }) 
});
popupNewPlace.setEventListeners();

const popupYouSure = new PopupYouSure('.popup__you-sure', (element, id) => {
    popupYouSure.handleSaving();
    API.deleteCard(id).then(() => {
        element.remove();
    popupYouSure.handleSaved(); 
    });
});
popupYouSure.setEventListeners();

const popupNewAvatar = new PopupWithForm('.popup__new-avatar', (inputs)=>{
    popupNewAvatar.handleSaving();
    API.changeAvatar(inputs.url).then(() => {
        userInfo._avatar.src = inputs.url;
    popupNewAvatar.handleSaved();
    })
});
popupNewAvatar.setEventListeners();


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
changeAvatarButton.addEventListener('click', event => {
    popupNewAvatar.open();
    NewPlaceFormValidation._disableSubmitButton(NewPlaceFormValidation._button);
})

function generateCard(item) {
    return new Card(item.name, item.link, item.owner._id, item._id, item.likes, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }, (element, id) => {
        popupYouSure.open(element, id);
    }).generateCard();
};