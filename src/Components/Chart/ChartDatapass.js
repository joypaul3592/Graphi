var DataPassDekhi
const ChartDatapass = (Data) => {
    DataPassDekhi = Data
}
/* ============== crete new url =================  */
function NewUrl() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
const usergetData = NewUrl()
export { ChartDatapass, NewUrl, DataPassDekhi,usergetData };