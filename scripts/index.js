const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__button');
const closePopup = popup.querySelector('.popup__close');
let popupNameInput = document.querySelector('.popup__input_value_name');
let popupProfessionInput = document.querySelector('.popup__input_value_profession');
let popupSubmitBtn = document.querySelector('.popup__submit-button');
let popupForm = document.querySelector('.popup__form')
let nameTitle = document.querySelector('.profile__title');
let professionSubtitle = document.querySelector('.profile__subtitle');

function onOpenPopup() {
    popup.classList.add('popup_opened');
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
};
function onClosePopup() {
    popup.classList.remove('popup_opened');  
};
function formSubmitHandler (event) {
    event.preventDefault(); 
    nameTitle.textContent = popupNameInput.value;
    professionSubtitle.textContent = popupProfessionInput.value;                                           
    onClosePopup();                                        
};

openPopup.addEventListener('click', onOpenPopup);
closePopup.addEventListener('click', onClosePopup);
popupForm.addEventListener('submit', formSubmitHandler); 