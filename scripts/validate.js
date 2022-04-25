const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorActive);
};
  
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.inputErrorActive);
    errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};
  
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState (inputList, buttonElement, config)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState (inputList, buttonElement, config)
        });
    });
};
  
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, config); 
    });
};

function hasInvalidInput (inputList){
    return inputList.some((inputElement) => {   
        return !inputElement.validity.valid;
    });
}; 

function toggleButtonState(inputList, buttonElement, config) {
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
    };
};
//const popupContainer = document.querySelector('.popup__container')

function closeOverlay(event){
    if (! event.target.querySelector('.popup__container')){
        closePopup(event.target.closest('.popup))
                                        
    }
}
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputErrorActive: 'popup__input-error_active'
});

