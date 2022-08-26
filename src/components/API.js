export default class Api {
    constructor(url, authorization){
        this._url = url;
        this._authorization = authorization;
    }
    
    _handleResponce(res){
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    async getApiCards(){
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        }).then(this._handleResponce);
    }

    async getApiUsers(){
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        }).then(this._handleResponce);
    }

    async setApiUsers(name, about){
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._handleResponce);
    }

    createCards(card){
        return fetch(`${this._url}/cards`,{
            method:'POST',
            headers:{ 
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        }).then(this._handleResponce);
    };

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(this._handleResponce);
    };

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(this._handleResponce);
    }

    removeLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(this._handleResponce);
    }

    changeAvatar(Avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: Avatar,
            })
        }).then(this._handleResponce);
    }
}