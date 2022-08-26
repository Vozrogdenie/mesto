export class FormValidator {
    constructor(elemConfig, form){
        this._elemConfig = elemConfig;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._elemConfig.inputSelector));
        this._button = this._form.querySelector(this._elemConfig.submitButtonSelector)
    };

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.popup__input-${inputElement.name}-error`);
        inputElement.classList.add(this._elemConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._elemConfig.inputErrorActive);
    };
      
    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.popup__input-${inputElement.name}-error`);
        inputElement.classList.remove(this._elemConfig.inputErrorClass);
        errorElement.classList.remove(this._elemConfig.inputErrorActive);
        errorElement.textContent = '';
    };
      
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
           this._hideInputError(inputElement);
        };
    };
      
    _setEventListeners = () => {
        this._toggleButtonState (this._inputs , this._button);
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputs, this._button)
            }.bind(this));
        });
    };
      
    enableValidation = () => {
        this._form.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        this._setEventListeners(); 
    };
    
    _hasInvalidInput (inputs){
        return this._inputs.some((inputElement) => {   
            return !inputElement.validity.valid;
        });
    }; 

    _addSubmitButton(button) {
        button.classList.remove(this._elemConfig.inactiveButtonClass);
        button.removeAttribute("disabled");
    };
    
    disableSubmitButton(button) {
        button.classList.add(this._elemConfig.inactiveButtonClass);
        button.setAttribute("disabled", true);
    }; 

    _toggleButtonState(inputs, button){
        if (this._hasInvalidInput(inputs)){
            this.disableSubmitButton(button)
        } else {
            this._addSubmitButton(button);
        };
    };
};