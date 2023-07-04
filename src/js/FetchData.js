
function getSuspender(promise){
    let status = "pendiente";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "exitoso";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );
    const leer = () => {
        switch(status){
            case "pendiente":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    }
    return { leer }
}

export function fetchData(url){
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data)
    return getSuspender(promise);
}