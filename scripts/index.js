const popupEdit = document.querySelector('.popup_edit');
const openPopupEdit = document.querySelector('.profile__button');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const popupEditForm = document.querySelector('.popup__edit-form');

const popupNewPlace = document.querySelector('.popup_new-place');
const openPopupNewPlace = document.querySelector('.add-button');
const closePopupNewPlace = popupNewPlace.querySelector('.popup__close');
const popupNewPlaceForm = document.querySelector('.popup__new-place-form');

const elementTemplate = document.querySelector('#element-template').content;
const sectionElements = document.querySelector('.elements');

const picture = document.querySelector('.picture');
const closeFullPhoto = picture.querySelector('.picture__close');


let popupNameInput = document.querySelector('.popup__input_value_name');
let popupProfessionInput = document.querySelector('.popup__input_value_profession');
let popupNewPlaceTitleInput = document.querySelector('.popup__input_value_title');
let popupNewPlaceUrlInput = document.querySelector('.popup__input_value_url');

let nameTitle = document.querySelector('.profile__title');
let professionSubtitle = document.querySelector('.profile__subtitle');

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
  

function onOpenPopup(popup) {
    popup.classList.add('popup_opened');
};
function onClosePopup(popup) {
    popup.classList.remove('popup_opened');  
};

openPopupEdit.addEventListener('click', event => { 
    event.preventDefault();
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
    onOpenPopup(popupEdit);
});
closePopupEdit.addEventListener('click', event => {
    event.preventDefault();
    onClosePopup(popupEdit);
});
popupEditForm.addEventListener('submit', event => {
    event.preventDefault(); 
    nameTitle.textContent = popupNameInput.value;
    professionSubtitle.textContent = popupProfessionInput.value;                                           
    onClosePopup(popupEdit);
});

openPopupNewPlace.addEventListener('click', event => {
    event.preventDefault();
    onOpenPopup(popupNewPlace);
});
closePopupNewPlace.addEventListener('click', event => {
    event.preventDefault();
    onClosePopup(popupNewPlace);
});
popupNewPlaceForm.addEventListener('submit', event => {
    event.preventDefault();
    const newCard = createNewCard(popupNewPlaceTitleInput.value, popupNewPlaceUrlInput.value)                             
    addNewCard(newCard);
    onClosePopup(popupNewPlace);
});

closeFullPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    onClosePopup(picture);
});

initialCards.forEach((card) => {
    const newCard = createNewCard(card.name, card.link);
    addNewCard(newCard);
});

function createNewCard(name, link) {
    const elementCard = elementTemplate.cloneNode(true);
    elementCard.querySelector(".element__text").textContent = name;
    const cardImg = elementCard.querySelector(".element__item");
    cardImg.src = link;
    cardImg.alt = name;

    elementCard.querySelector(".element__heart").addEventListener("click", (event) => {
      event.target.classList.toggle("element__active_heart");
    });

    elementCard.querySelector(".element__trach").addEventListener("click", (event) => {
        event.target.closest(".element").remove();
    });

    cardImg.addEventListener("click", (event) => {
        event.preventDefault();
        picture.querySelector('.picture__foto').src = cardImg.src;
        picture.querySelector('.picture__title').textContent = name;
        onOpenPopup(picture);
    });
    return elementCard;
};

function addNewCard(element) {
    sectionElements.prepend(element);
};


  