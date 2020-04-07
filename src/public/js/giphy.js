class Giphy{

    constructor(keyword){
        this.keyword = keyword;
        this.endpoint = "http://api.giphy.com/v1/gifs"
        this.api_key = "dc6zaTOxFJmzC"
    }

    getGifUrl(callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",this.endpoint+"/translate?api_key="+this.api_key+"&s="+this.keyword);
        //translate,search,random
        xhr.responseType= "json";

        xhr.onload = function(){
            //respeus del servidor giphy
            callback(this.response.data.images.original.mp4);
        }
        xhr.send();
    }
    //generar objeto de la clase giphy
    static getUrlAsync(keyword,callback){
        return new Giphy(keyword).getGifUrl(callback);

    }
}