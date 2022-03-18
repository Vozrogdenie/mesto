const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup-open');
const closePopup = popup.querySelector('.popup__close')

function togglePopup(){
    popup.classList.toggle('popup__open');
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);


const popupName = document.querySelector('.popup__name')
popupName.value = 'Жак-Ив-Кусто'

const popupProfession = document.querySelector('.popup__profession')
popupProfession.value = 'Иследователь океана'