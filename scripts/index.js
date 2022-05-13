
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const elemConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputErrorActive: 'popup__input-error_active'
};
const popupEdit = document.querySelector('.popup_edit');
const buttonOpenPopupEdit = document.querySelector('.profile__button');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
const popupEditForm = document.querySelector('.popup__edit-form');

const popupNewPlace = document.querySelector('.popup_new-place');
const buttonOpenPopupNewPlace = document.querySelector('.add-button');
const buttonClosePopupNewPlace = popupNewPlace.querySelector('.popup__close');
const popupNewPlaceForm = document.querySelector('.popup__new-place-form');

const elementTemplate = document.querySelector('#element-template').content;
const sectionElements = document.querySelector('.elements');

const picture = document.querySelector('.popup_type_picture');
const pictureFoto = picture.querySelector('.popup__foto')
const closeFullPhoto = picture.querySelector('.popup__close');
const pictureTitle = picture.querySelector('.popup__title_type_picture');

const popupNameInput = document.querySelector('.popup__input_value_name');
const popupProfessionInput = document.querySelector('.popup__input_value_profession');
const popupNewPlaceTitleInput = document.querySelector('.popup__input_value_title');
const popupNewPlaceUrlInput = document.querySelector('.popup__input_value_url');

const nameTitle = document.querySelector('.profile__title');
const professionSubtitle = document.querySelector('.profile__subtitle');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];  

const EditFormValidation = new FormValidator(elemConfig, popupEditForm);
EditFormValidation.enableValidation();
const NewPlaceFormValidation = new FormValidator(elemConfig, popupNewPlaceForm);
NewPlaceFormValidation.enableValidation();

export function оpenPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escapePopup);
    popup.addEventListener('click', closeOverlay);
};
function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', escapePopup);
    popup.removeEventListener('click', closeOverlay);
};

function closeOverlay(event){
    if (event.target === event.currentTarget){
        closePopup(event.target.closest('.popup'));
        const formOpened = event.target.querySelector('form');                                                            
    }
}
function escapePopup(event){
    if (event.code =='Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        const formOpened = popupOpened.querySelector('form');
        closePopup(popupOpened)
    }
}
buttonOpenPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
    оpenPopup(popupEdit);
});
buttonClosePopupEdit.addEventListener('click', event => {
    closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', event => {
    event.preventDefault(); 
    nameTitle.textContent = popupNameInput.value;
    professionSubtitle.textContent = popupProfessionInput.value;                                           
    closePopup(popupEdit);
});

buttonOpenPopupNewPlace.addEventListener('click', event => {
    оpenPopup(popupNewPlace);
    popupNewPlaceForm.reset();
});
buttonClosePopupNewPlace.addEventListener('click', event => {
    closePopup(popupNewPlace);
});
popupNewPlaceForm.addEventListener('submit', event => {
    event.preventDefault();
    const newCard = new Card(popupNewPlaceTitleInput.value, popupNewPlaceUrlInput.value, '#element-template').generateCard();                          
    addNewCard(newCard);
    closePopup(popupNewPlace);
});

buttonClosePopupEdit.addEventListener('click', (event) => {
    closePopup(picture);
});
closeFullPhoto.addEventListener('click', (event) => {
    closePopup(picture);
});

function addNewCard(element) {
    sectionElements.prepend(element);
};

initialCards.forEach((card) => {
    const newCard = new Card(card.name, card.link, '#element-template').generateCard();
    addNewCard(newCard);
});