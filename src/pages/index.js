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
    popupNewAvatarForm,
    popupNameInput,
    popupProfessionInput,
    api_url,
    api_auth,
    changeAvatarButton,
} from '../utils/constants';
import { UserInfo } from "../components/UserInfo.js";
import Api from "../components/API.js";

export const API = new Api(api_url, api_auth);
const userInfo = new UserInfo();
let section;
export let currentOwnerId;

Promise.all([usersRequest, cardsRequest]);
const usersRequest = API.getApiUsers().then(res => {
    currentOwnerId = res._id;
    userInfo.setUserInfo(res.name, res.about, res.avatar)
}).catch((err) => {
    console.log(err);
}); 
const cardsRequest = API.getApiCards().then(res => {
    section = new Section(res.reverse(), generateCard, '.elements');
    section.renderItems();
}).catch((err) => {
    console.log(err);
});

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    popupEdit.handleSaving();
    API.setApiUsers(inputs.name, inputs.profession).then(() => {
        userInfo.setUserInfo(inputs.name, inputs.profession);
        popupEdit.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
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
        popupNewPlace.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        popupNewPlace.handleSaved();
    }); 
});
popupNewPlace.setEventListeners();

const popupYouSure = new PopupYouSure('.popup_you-sure', (card) => {
    popupYouSure.handleSaving();
    API.deleteCard(card._id).then(() => {
        card.removeCard();        
        popupYouSure.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        popupYouSure.handleSaved();
    }); 
});
popupYouSure.setEventListeners();

const popupNewAvatar = new PopupWithForm('.popup_new-avatar', (inputs)=>{
    popupNewAvatar.handleSaving();
    API.changeAvatar(inputs.url).then(() => {
        userInfo.setUserAvatar(inputs.url);
        popupNewAvatar.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        popupNewAvatar.handleSaved();
    });
});
popupNewAvatar.setEventListeners();


const editFormValidation = new FormValidator(elemConfig, popupEditForm);
editFormValidation.enableValidation();
const newPlaceFormValidation = new FormValidator(elemConfig, popupNewPlaceForm);
newPlaceFormValidation.enableValidation();
const popupNewAvatarFormValidation = new FormValidator(elemConfig, popupNewAvatarForm);
popupNewAvatarFormValidation.enableValidation();

buttonOpenPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  userInfo.getUserInfo().name;
    popupProfessionInput.value = userInfo.getUserInfo().profession;
    popupEdit.open();
    editFormValidation.disableSubmitButton(editFormValidation._button);
});
buttonOpenPopupNewPlace.addEventListener('click', event => {
    popupNewPlace.open();
    newPlaceFormValidation.disableSubmitButton(newPlaceFormValidation._button);

});
changeAvatarButton.addEventListener('click', event => {
    popupNewAvatar.open();
    newPlaceFormValidation.disableSubmitButton(newPlaceFormValidation._button);
})

function generateCard(item) {
    return new Card(item.name, item.link, item.owner._id, item._id, item.likes, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }, (card) => {
        popupYouSure.open(card);
    }, (card) => {
        if (card._likes.find(el => el._id === card._owner) !== undefined) {
            API.removeLike(card._id).then(res => {
                card._likes = res.likes;
                card._element.querySelector('.element__heart-count').textContent = res.likes.length;
                card._element.querySelector('.element__heart').classList.remove('element__active_heart')
            });
        } else {
            API.addLike(card._id).then(res => {
                card._likes = res.likes;
                card._element.querySelector('.element__heart-count').textContent = res.likes.length;
                card._element.querySelector('.element__heart').classList.add('element__active_heart');
            });
        };
    }).generateCard();
};