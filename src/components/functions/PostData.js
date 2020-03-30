export function PostData(type, userData){

    const BaseUrl = 'http://localhost:3008';

    return new Promise((resolve, reject) => {
        
        console.log(JSON.stringify(userData))
        fetch(BaseUrl+type,{
            method: 'POST',
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
            console.log(JSON.stringify(userData))
        })
        .catch((error) => {
            reject(error);
            console.log(error)
        })

    })

}   