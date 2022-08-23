class Api{
    constructor(url, authorization){
        this.url = url;
        this.authorization = authorization;
    }

    getApiCards(){
       return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
     headers: {
        authorization: 'c7779e8e-b945-41f5-b681-0ea9ccf3c32a',
        'Content-Type': 'application/json'
         }
            })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
     }); 
    }

    getApiUsers(){
        fetch('https://nomoreparties.co/v1/сohort-48/users/me', {
            headers: {
               authorization: 'c7779e8e-b945-41f5-b681-0ea9ccf3c32a',
               'Content-Type': 'application/json'
                }
                   })
           .then(res => res.json())
           .then((result) => {
               console.log(result);
            }); 
           }
    }

