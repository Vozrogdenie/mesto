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
  

function оpenPopup(popup) {
    popup.classList.add('popup_opened');
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');  
};

openPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
    оpenPopup(popupEdit);
});
closePopupEdit.addEventListener('click', event => {
    closePopup(popupEdit);
});
popupEditForm.addEventListener('submit', event => {
    event.preventDefault(); 
    nameTitle.textContent = popupNameInput.value;
    professionSubtitle.textContent = popupProfessionInput.value;                                           
    closePopup(popupEdit);
});

openPopupNewPlace.addEventListener('click', event => {
    оpenPopup(popupNewPlace);
});
closePopupNewPlace.addEventListener('click', event => {
    closePopup(popupNewPlace);
});
popupNewPlaceForm.addEventListener('submit', event => {
    event.preventDefault();
    const newCard = createNewCard(popupNewPlaceTitleInput.value, popupNewPlaceUrlInput.value)                             
    addNewCard(newCard);
    popupNewPlaceTitleInput.value='';
    popupNewPlaceUrlInput.value='';
    closePopup(popupNewPlace);
});

closePopupEdit.addEventListener('click', (event) => {
    closePopup(picture);
});
closeFullPhoto.addEventListener('click', (event) => {
    closePopup(picture);
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
        pictureFoto.src = link;
        pictureFoto.alt = name;
        pictureTitle.textContent = name;
        оpenPopup(picture);
    });
    return elementCard;
};

function addNewCard(element) {
    sectionElements.prepend(element);
};



const formElement = document.querySelector('.popup__edit-form');
const formInput = formElement.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}; 
 formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid); 

const formError = formElement.querySelector(`.${formInput.id}-error`); 

  
