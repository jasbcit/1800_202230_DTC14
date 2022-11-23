var data;
var dataRequest;

function sendData() {
    dataFromBox = document.querySelector("#user-input").value;
    dataSentiment = "TextToAnalyze=" + dataFromBox;
    dataRephrase = "TextToTranslate=" + dataFromBox + "&TargetRephrasingCount=1";

 
    var index = ["analytics/sentiment", "rephrase/rephrase/eng/by-sentence", "analytics/subjectivity"];
    var dataIndex = [dataSentiment, dataRephrase, dataSentiment]
    for (var i = 0; i < index.length; i++) {
        var url = "https://api.cloudmersive.com/nlp-v2/" + index[i];
        let request = new XMLHttpRequest();
        request.open("POST", url);
        request.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log("response:" + this.responseText);
            }
        });
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.setRequestHeader("Apikey", "0ab224ab-3fa8-4eda-b843-ef0337e64f2d");
        request.send(dataIndex[i]);
    }

}


