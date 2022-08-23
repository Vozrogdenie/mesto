import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import '../pages/index.css';
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";

import {
    elemConfig,
    buttonOpenPopupEdit,
    popupEditForm,
    buttonOpenPopupNewPlace,
    popupNewPlaceForm,
    popupNameInput,
    popupProfessionInput,
    initialCards,
    

} from '../utils/constants';
import { UserInfo } from "../components/UserInfo.js";


const userInfo = new UserInfo();

const section = new Section(initialCards, generateCard, '.elements');
section.renderItems();

const popupPicture = new PopupWithImage('.popup_type_picture');
const popupEdit = new PopupWithForm('.popup_edit', (inputs) => {
    userInfo.setUserInfo(inputs.name, inputs.profession);
});
popupEdit.setEventListeners();
popupPicture.setEventListeners();

const popupNewPlace = new PopupWithForm('.popup_new-place', (inputs) => {
    const card = generateCard({ name: inputs.title, link: inputs.url });
    section.addItem(card);
});
popupNewPlace.setEventListeners();

const EditFormValidation = new FormValidator(elemConfig, popupEditForm);
EditFormValidation.enableValidation();
const NewPlaceFormValidation = new FormValidator(elemConfig, popupNewPlaceForm);
NewPlaceFormValidation.enableValidation();

buttonOpenPopupEdit.addEventListener('click', event => { 
    popupNameInput.value =  userInfo.getUserInfo().name;
    popupProfessionInput.value = userInfo.getUserInfo().profession;
    popupEdit.open();
    EditFormValidation._disableSubmitButton(EditFormValidation._button);
});
buttonOpenPopupNewPlace.addEventListener('click', event => {
    popupNewPlace.open();
    NewPlaceFormValidation._disableSubmitButton(NewPlaceFormValidation._button);

});

function generateCard(item) {
    return new Card(item.name, item.link, '#element-template', (name, link) => {
        popupPicture.open(name, link);
    }).generateCard();
};

//все ниже


//renderLoading(true);


// function search(url, authorization){ 
//    return fetch(`hhttps://mesto.nomoreparties.co/${url}/${authorization}/`)}
// form.addEventListener('submit', function submit(e) {
//    e.preventDefault();
//     search(form.elements.url.value, form.elements.authorization.value)
//     .then((res)=>{
//          if(res.ok){
//            return res.json()
//           }
//           return Promise.reject(res.status)
//           })
//           .then((res)=>{
//             renderResult(res.name)
//           })
//           .catch((err)=>{
//           renderError(`Ошибка: ${err}`)
//           })
//           .finally(() => {
//            renderLoading(false);
//           });
//         });
        
//   function renderResult(text){
//     result.textContent = text;
//      error.textContent = '';
//    }
//    function renderError(err){
//      result.textContent = '';
//      error.textContent = err;
//    }

   //функция когда идет загрузка сохранения картинки
//    function renderLoading(isLoading){
// if(isLoading){
//     submitButtonSelector.innerText = 'Сохранение...'
// }else{
//     submitButtonSelector.innerText = 'Сохранить'
// }
//    }