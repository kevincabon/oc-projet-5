let showProductInfos = (data) => {
    let container = document.getElementById('container');
    //let html = "<h2>" + data.name + "</h2><img src='"+data.imageUrl+"' class='col-12'><p>" + data.description + "</p>";
    let personalisation = [];
    if (data.varnish){
        var personalisationData = data.varnish;
    }else if (data.colors){
        var personalisationData = data.colors;
    }else if (data.lenses){
        var personalisationData = data.lenses;
    }
    for (let i in personalisationData){
        personalisation += "<option>" + personalisationData[i] + "</option>";
    }
    let html =  "<h2>" + data.name + "</h2>" +
                "<img src='"+data.imageUrl+"' class='col-12'>" +
                "<p>" + data.description + "</p>" +
                "Personnalisation : <select id='personalisation'>" + personalisation + "</select>";
    container.innerHTML = html;
    document.getElementById('price').innerHTML = data.price + " $";
}

export {showProductInfos};