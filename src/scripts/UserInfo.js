import { nameTitle, professionSubtitle } from "../utils/constants.js";

export class UserInfo {
    getUserInfo() {
        const userInfo = {
            nameTitleInput: nameTitle.textContent,
            professionSubtitleInput: professionSubtitle.textContent
        };
        return userInfo;
    };

    setUserInfo(name, position) {
        nameTitle.textContent = name;
        professionSubtitle.textContent = position;
    };
};