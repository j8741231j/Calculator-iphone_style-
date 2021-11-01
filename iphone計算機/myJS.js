// 紀錄算式的暫存區
var valueArray = []; //數字陣列
var operatorArray = []; //運算符陣列

//運算符號是否備按過
var opClick = 1; //還沒按
//2是按過了+-x÷
//3是剛按過 "等於"

// 數字按鍵
function btnOneClick(input) {
    document.getElementById('symC').innerText = "C";
    var text = document.getElementById('td_A1').innerText;
    var fdStart = text.indexOf("0");
    var fdSecond = text.indexOf(".");
    //先判斷運算符號是否被按過; 檢查開頭是否為 0 或者 0.
    if (opClick == 1) {
        if (fdStart == 0 && fdSecond == -1) {
            document.getElementById('td_A1').innerText = text.substr(1) + input.innerText;
        } else {
            document.getElementById('td_A1').innerText = text + input.innerText;
        }
    } else {
        document.getElementById('td_A1').innerText = input.innerText;
        opClick = 1;
    }
    delVisited();
}

// 正負號
function fnSymPN() {
    var text = document.getElementById('td_A1').innerText;
    var fdStart = text.indexOf("-");
    if (fdStart == 0) {
        document.getElementById('td_A1').innerText = text.substr(1);
    } else {
        document.getElementById('td_A1').innerText = "-" + text;
    }
    opClick = 1;
    delVisited();
}

//百分比鍵
function fnPercent() {

    var text = document.getElementById('td_A1').innerText;
    document.getElementById('td_A1').innerText = text * 0.01;
    delVisited();

}

//小數點鍵
function fnPoint(input) {
    var text = document.getElementById('td_A1').innerText;
    if (text.indexOf(".") == -1) {
        document.getElementById('td_A1').innerText = text + input.innerText;
    }
    delVisited();
}

//運算符按鍵
function btnOperator(input) {

    if (opClick == 1 || opClick == 3) {
        var num = parseFloat(document.getElementById('td_A1').innerText);
        valueArray.push(num);

        operatorArray.push(input.innerText);

        opClick = 2;
    } else {
        operatorArray.pop();
        operatorArray.push(input.innerText);
    }

    delVisited();
    opVisited();

}

// 等於
function fnEquals() {
    var num = parseFloat(document.getElementById('td_A1').innerText);
    valueArray.push(num);
    var sum = valueArray[0];
    for (var i = 1; i < valueArray.length; i++) {
        for (var j = 0; j < (valueArray.length - 1); j++) {
            console.log(operatorArray[j]);
            switch (operatorArray[j]) {

                case "+":
                    sum = ((sum * 10) + (valueArray[i] * 10)) / 10;
                    break;
                case "-":
                    sum = ((sum * 10) - (valueArray[i] * 10)) / 10;
                    break;
                case "×":
                    sum = ((sum * 10) * (valueArray[i] * 10)) / 100;
                    break;
                case "÷":
                    sum = (sum * 10) / (valueArray[i] * 10);
                    break;
            }
            break;
        }
    }
    document.getElementById('td_A1').innerText = sum;
    opClick = 3;
    valueArray = [];
    operatorArray = [];
    delVisited();
}

// 歸零鍵
function fnSymAC() {
    document.getElementById('td_A1').innerText = '0';
    valueArray = [];
    operatorArray = [];
    document.getElementById('symC').innerText = "AC";
    delVisited();
}

//運算符Visited特效
function opVisited() {

    if (opClick == 2) {

        switch (operatorArray[operatorArray.length - 1]) {

            case "+":

                var elem = document.getElementById('symAdd');
                elem.style.backgroundColor = "white";
                elem.style.color = "rgb(231, 153, 8)";
                break;
            case "-":

                var elem = document.getElementById('symSubtract');
                elem.style.backgroundColor = "white";
                elem.style.color = "rgb(231, 153, 8)";
                break;
            case "×":

                var elem = document.getElementById('symMultiply');
                elem.style.backgroundColor = "white";
                elem.style.color = "rgb(231, 153, 8)";
                break;
            case "÷":

                var elem = document.getElementById('symDivision');
                elem.style.backgroundColor = "white";
                elem.style.color = "rgb(231, 153, 8)";
                break;
        }
    }
}

//運算符Visited特效取消
function delVisited() {
    var other = document.getElementsByClassName('operator');
    for (var i = 0; i < 5; i++) {
        other[i].style.color = "white";
        other[i].style.backgroundColor = "rgb(231, 153, 8)";
    }
}