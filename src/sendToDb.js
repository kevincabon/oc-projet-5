export default function sendData(url,data) {
    let request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            //console.log(response);
            console.log(this.status);
            console.log(this.responseText);
        }
        console.log(data);
        request.send(JSON.stringify(data));
    }
}