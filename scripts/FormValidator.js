export class FormValidator {
    constructor(element, form){
        this._element = element;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._element.inputSelector));
        this._button = this._form.querySelector(this._element.submitButtonSelector)
        
    }
     _showInputError = (inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
        inputElement.classList.add(this._element.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._element.inputErrorActive);
    };
      
    _hideInputError = (inputElement) => {
        const errorElement = formElement.querySelector(`.popup__input-${inputElement.name}-error`);
        inputElement.classList.remove(this._element.inputErrorClass);
        errorElement.classList.remove(this._element.inputErrorActive);
        errorElement.textContent = '';
    };
      
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
           this._hideInputError(inputElement);
        }
    };
      
    _setEventListeners = () => {
        this._toggleButtonState ();
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                this._checkInputValidity();
                this._toggleButtonState ()
            });
        });
    };
      
    _enableValidation = () => {
            this._form.addEventListener('submit', function(evt){
                evt.preventDefault();
            })
            this._setEventListeners(); 
    };
    
    _hasInvalidInput (){
        return this._inputs.some((inputElement) => {   
            return !inputElement.validity.valid;
        });
    }; 

    _toggleButtonState = () => {
        if(this._hasInvalidInput()){
                this._button.classList.add(this._element.submitButtonSelector);
                this._button.setAttribute("disabled", true);
        } else {
            this._button.classList.remove(this._element.submitButtonSelector);
            this._button.removeAttribute("disabled");
        };
    };
    
    
}