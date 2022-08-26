import Api from "./API";

export class UserInfo {
    constructor() {
        this._name = document.querySelector('.profile__title');
        this._profession = document.querySelector('.profile__subtitle');
        this._avatar= document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            profession: this._profession.textContent,
            avatar: this._avatar.src
        };
    };

    setUserInfo(name, profession, avatar) {
        this._name.textContent = name;
        this._profession.textContent = profession;
        if (avatar) this._avatar.src = avatar;
    };

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
};