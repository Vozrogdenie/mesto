const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close');

let popupNameInput = document.querySelector('.popup__name');
let popupProfessionInput = document.querySelector('.popup__profession');
let popupSubmitBtn = document.querySelector('.popup__submit-button');

let nameTitle = document.querySelector('.profile__title');
let professionSubtitle = document.querySelector('.profile__subtitle');

function onOpenPopup() {
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_closed');
    popupNameInput.value =  nameTitle.textContent;
    popupProfessionInput.value = professionSubtitle.textContent;
};
function onClosePopup() {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_closed');
};
openPopup.addEventListener('click', onOpenPopup);
closePopup.addEventListener('click', onClosePopup);

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
    onClosePopup();
};
popupSubmitBtn.addEventListener('click', onSubmitBtn);

function onEnterBtn(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        nameTitle.textContent = popupNameInput.value;
        professionSubtitle.textContent = popupProfessionInput.value;
        onClosePopup();
    }
}
popupNameInput.addEventListener('keyup', onEnterBtn);
popupProfessionInput.addEventListener('keyup', onEnterBtn);