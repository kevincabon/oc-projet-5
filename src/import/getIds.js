let getIds = () => {
    let object = window.location.search.substr(1).split('&');
    let value = [];
    for (let part of object){
        let id = part.split("=");
        value.push(id[1]);
    }
    return {"category": value[1], "product_id": value[0]};
}

export { getIds };