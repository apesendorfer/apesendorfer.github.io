var output_list;
var input_list;
var sent_length;
var punctuation = [".", ",", ";", ":", "!", "?", "-", "`", "--", "---", "—", ")", "]", "}", "'", "\"", "n't", "'s"];
var inputText;
function f1() {
    element = document.getElementById("finesseButton");
    element.disabled = true;
    element.style.animation = "bgColor 10s infinite linear";
    inputText = document.getElementById("textarea1").value;
    modifiedInputText = inputText.replaceAll("\n", " NewLineMarker ");
    modifiedInputText = modifiedInputText.replaceAll("&#13;&#10;", " NewLineMarker ");
    console.log(modifiedInputText);
    var payload = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    body: JSON.stringify(modifiedInputText),
    headers: {
        'origin': 'https://withfinesse.io',
        'Content-Type': 'application/json',
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
    },
    
    };
    const Url = "https://i7a0fn1zof.execute-api.us-east-2.amazonaws.com/test/suggestions";
    var outputText = "";
    // var input_list;
    fetch(Url, payload)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        // console.log("data: ", data);
        input_list = data[0].slice(1, data[0].length - 1);
        output_list = data[1].slice(1, data[1].length - 1);
        sent_length = input_list.length;
        f2(input_list)
        // document.getElementById("output").innerHTML = data;
    });
    // document.getElementById("output").innerHTML = outputText;
    // var input_list = ["", "Test", "sentence", "."];
    
    
    
}

function f2(input_list) {
    text = "<div class='container2'><div class='descrip2'>"
    for (let i = 0; i < input_list.length; i++) {
        if (input_list[i].length > 0) {
            if (input_list[i] == "NewLineMarker") {
                text += "<br><span id=\"" + i + "\"></span>";
            }
            else {
                text += "<span id=\"" + i + "\" onmouseover=\"f3(" + i + ")\"" + " onmouseout=\"f5(this)\">" + input_list[i] + " " + "</span>";
            }
        }
    }
    text += "</div></div><br>"
    document.getElementById("static-input").innerHTML = text;
    element = document.getElementById("finesseButton");
    element.disabled = false;
    element.style.animation = "none";
}
// EventHandler takes inputs: event, length, i
var EventHandler = function() {
    // console.log("ENTERED ONKEYDOWN")
    // console.log("output_list[i].length:", length)
    // console.log("i:", num)
    if (event.key === '1' && length > 0) {
        // console.log("PRESSED 1")
        document.getElementById(num).innerHTML = document.getElementById("b0").innerHTML.substring(3) + " ";
    }
    if (event.key === '2' && length > 1) {
        document.getElementById(num).innerHTML = document.getElementById("b1").innerHTML.substring(3) + " ";
    }
    if (event.key === '3' && length > 2) {
        document.getElementById(num).innerHTML = document.getElementById("b2").innerHTML.substring(3) + " ";
    }
    if (event.key === '4' && length > 3) {
        document.getElementById(num).innerHTML = document.getElementById("b3").innerHTML.substring(3) + " ";
    }
    if (event.key === '5' && length > 4) {
        document.getElementById(num).innerHTML = document.getElementById("b4").innerHTML.substring(3) + " ";
    }
}

function f3(i) {
    var element = document.getElementById(i)
    element.style.fontWeight = "bold";
    element.style.color = "magenta"
    text2 = "";
    length = output_list[i].length;
    num = i;
    if (output_list[i].length > 0) {
        for (let j = 0; j < output_list[i].length; j++) {
            text2 += "<button style=\"background: #F4BFA1; border-radius: 15px; margin-right: 5px; margin-botton: 5px;\" id=\"b" + j + "\" type=\"button\" onclick=\"f4(this.innerHTML.substring(3), " + i + ")\">" + (j+1) + ". " + output_list[i][j] + "</button>"
        }
    }
    document.getElementById("choices").innerHTML = text2;
    window.addEventListener('keydown', EventHandler.bind(event, length, num));
}

function f4(text, i) {
    document.getElementById(i).innerHTML = text + " ";
}

function f5(object) {
    object.style.fontWeight = "normal"
    object.style.color = "black"
    // console.log("REMOVE EVENTLISTENER")
    window.removeEventListener('keydown', EventHandler);
}

function change() {
    str = "";
    for (let i = 0; i < sent_length; i++) {
        if (i + 1 < sent_length) {
            var currentWord = document.getElementById(i).innerHTML;
            var nextWord = document.getElementById(i + 1).innerHTML;
            console.log(nextWord);
            if (punctuation.includes(nextWord.slice(0, nextWord.length - 1))) {
                console.log(nextWord);
                str += currentWord.slice(0, currentWord.length - 1);
            }
            else {
                str += document.getElementById(i).innerHTML;
            }
        }
        else {
            str += document.getElementById(i).innerHTML;
        }
    }
    str = str.replaceAll(" NewLineMarker ", "&#13;&#10;");
    document.getElementById("textarea1").value = str;
}

function revert() {
    // str = "";
    // for (let i = 0; i < sent_length; i++) {
    //   str += input_list[i] + " ";
    // }
    // document.getElementById("textarea1").value = str;
    document.getElementById("textarea1").value = inputText;
}