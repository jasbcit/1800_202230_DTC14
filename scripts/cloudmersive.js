var data;
var dataRequest;

// *** THIS IS THE ORIGINAL CODE BELOW THAT USED A LOOP TO LOOP THROUGH ALL XML REQUESTS WE ARE NO LONGER USING IT BECAUSE IT CAUSED THE RESPONSES TO BE OUT OF ORDER ****

// function sendData() {
//     dataFromBox = document.querySelector("#user-input").value;
//     dataSentiment = "TextToAnalyze=" + dataFromBox;
//     dataRephrase = "TextToTranslate=" + dataFromBox + "&TargetRephrasingCount=1";


//     var index = ["analytics/sentiment", "rephrase/rephrase/eng/by-sentence"];
//     var dataIndex = [dataSentiment, dataRephrase, dataSentiment]
//     for (var i = 0; i < index.length; i++) {
//         var url = "https://api.cloudmersive.com/nlp-v2/" + index[i];
//         let request = new XMLHttpRequest();
//         request.open("POST", url);
//         let rephrase = ""
//         let sentiment = ""
//         request.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {

//                 console.log(JSON.parse(this.response)["SentimentClassificationResult"])
//                 sentiment = (JSON.parse(this.response)["SentimentClassificationResult"])
//                 rephrase = (JSON.parse(this.response)["RephrasedResults"][0]["Rephrasings"][0]["RephrasedSentenceText"])
//                 console.log(JSON.parse(this.response)["RephrasedResults"][0]["Rephrasings"][0]["RephrasedSentenceText"])
//                 document.getElementById("rephrase-placeholder").innerText = rephrase
//                 document.getElementById("sentiment-placeholder").innerText = sentiment
//             }
//         });
//         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//         request.setRequestHeader("Apikey", "0ab224ab-3fa8-4eda-b843-ef0337e64f2d");
//         request.send(dataIndex[i]);

//     }

// }

function sendDataRephrase() {
    // Calls the API and retrieves the rephrased user input and displays it in the re-worded container.
    dataFromBox = document.querySelector("#user-input").value;
    dataRephrase = "TextToTranslate=" + dataFromBox + "&TargetRephrasingCount=1";
    document.getElementById("rephrase-placeholder").innerText = "Loading..."
    let rephrase = ""
    var url = "https://api.cloudmersive.com/nlp-v2/rephrase/rephrase/eng/by-sentence";
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            for (var i = 0; i < document.querySelector(".sentences").innerHTML; i++ ) {
                rephrase += (JSON.parse(this.response)["RephrasedResults"][i]["Rephrasings"][0]["RephrasedSentenceText"]) + " "
            }
            console.log(rephrase)
            if(rephrase.includes("J&apos")){
                result = rephrase.replace("J&apos", "I")
            }
            else if(rephrase.includes("J'")){
                result = rephrase.replace("J'", 'I')
            }
            else if(rephrase.includes("j'")){
                result = rephrase.replace("j'", "I")
            }
             else{
                result = rephrase
            }
            document.getElementById("rephrase-placeholder").innerText = result
        }
    });
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Apikey", "5adaed35-ecc0-438c-b207-760a2f54eecd");
    request.send(dataRephrase);
}

function sendDataSentiment() {
  // Calls the API and retrieves the sentiment for user input and displays it in the sentiment container.
  dataFromBox = document.querySelector("#user-input").value;
  dataSentiment = "TextToAnalyze=" + dataFromBox;
  let sentiment = "";
  var url = "https://api.cloudmersive.com/nlp-v2/analytics/sentiment";
  let request = new XMLHttpRequest();
  request.open("POST", url);
  request.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      sentiment = JSON.parse(this.response)["SentimentClassificationResult"];
      document.getElementById("sentiment-placeholder").innerText = sentiment;
    }
  });
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.setRequestHeader("Apikey", "5adaed35-ecc0-438c-b207-760a2f54eecd");
  request.send(dataSentiment);
}



