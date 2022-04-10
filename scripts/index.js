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
  

function OpenPopup(popup) {
    popup.classList.add('popup_opened');
};
function ClosePopup(popup) {
    popup.classList.remove('popup_opened');  
};

openPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
    OpenPopup(popupEdit);
});
closePopupEdit.addEventListener('click', event => {
    event.preventDefault();
    ClosePopup(popupEdit);
});
popupEditForm.addEventListener('submit', event => {
    event.preventDefault(); 
    nameTitle.textContent = popupNameInput.value;
    professionSubtitle.textContent = popupProfessionInput.value;                                           
    ClosePopup(popupEdit);
});

openPopupNewPlace.addEventListener('click', event => {
    event.preventDefault();
    OpenPopup(popupNewPlace);
});
closePopupNewPlace.addEventListener('click', event => {
    event.preventDefault();
    ClosePopup(popupNewPlace);
});
popupNewPlaceForm.addEventListener('submit', event => {
    event.preventDefault();
    const newCard = createNewCard(popupNewPlaceTitleInput.value, popupNewPlaceUrlInput.value)                             
    addNewCard(newCard);
    popupNewPlaceTitleInput.value = "";
    popupNewPlaceUrlInput.value = "";
    ClosePopup(popupNewPlace);
});

closePopupEdit.addEventListener('click', (event) => {
    event.preventDefault();
    ClosePopup(picture);
});
closeFullPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    ClosePopup(picture);
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
        pictureFoto.src = cardImg.src;
        pictureFoto.alt = name;
        pictureTitle.textContent = name;
        OpenPopup(picture);
    });
    return elementCard;
};

function addNewCard(element) {
    sectionElements.prepend(element);
};


  