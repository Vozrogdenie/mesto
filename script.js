const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close')

const popupName = document.querySelector('.popup__name')
const popupProfession = document.querySelector('.popup__profession')

function togglePopup(){
    popupName.value = 'Жак-Ив-Кусто'
    popupProfession.value = 'Иследователь океана'
    popup.classList.toggle('popup__open');
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

