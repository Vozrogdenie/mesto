export class UserInfo {
    constructor() {
        this._name = document.querySelector('.profile__title');
        this._profession = document.querySelector('.profile__subtitle');
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            profession: this._profession.textContent
        };
    };

    setUserInfo(name, profession) {
        this._name.textContent = name;
        this._profession.textContent = profession;
    };
};