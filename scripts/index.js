
import { Card } from "./Card.js";

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
    hideInputError(popupEditForm, popupNameInput, elemConfig);
    hideInputError(popupEditForm, popupProfessionInput, elemConfig);
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
    hideInputError(popupNewPlaceForm, popupNewPlaceTitleInput, elemConfig);
    hideInputError(popupNewPlaceForm, popupNewPlaceUrlInput, elemConfig);  
    disableSubmitButton(popupNewPlace.querySelector('.popup__submit-button'));
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