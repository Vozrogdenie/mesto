export class UserInfo {
    constructor(name, profession) {
        this._name = document.querySelector('.profile__title');
        this._profession = document.querySelector('.profile__subtitle');
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            profession: this._profession.textContent
        };
        return userInfo;
    };

    setUserInfo(name, profession) {
        this._name.textContent = name;
        this._profession.textContent = profession;
    };
};