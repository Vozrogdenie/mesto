const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close');

let popupNameInput = document.querySelector('.popup__name');
let popupProfessionInput = document.querySelector('.popup__profession');
let popupSubmitBtn = document.querySelector('.popup__submit-button');

let nameTitle = document.querySelector('.profile__title');
let professionSubtitle = document.querySelector('.profile__subtitle');

function togglePopup() {
    popup.classList.toggle('popup__open');
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

function editName(event) {
    event.preventDefault();
    popupNameInput.value = event.target.value;
};
popupNameInput.addEventListener('change', editName);

function editProfession(event) {
    event.preventDefault();
    popupProfessionInput.value = event.target.value;
};
popupProfessionInput.addEventListener('change', editProfession);

function onSubmitBtn() {
    nameTitle.textContent = popupNameInput.value;
    professionSubtitle.textContent = popupProfessionInput.value;
    togglePopup();
};
popupSubmitBtn.addEventListener('click', onSubmitBtn);