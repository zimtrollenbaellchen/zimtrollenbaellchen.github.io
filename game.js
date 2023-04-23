
if (!Number.prototype.getDecimals) {
    Number.prototype.getDecimals = function() {
        var num = this,
            match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match)
            return 0;
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
}


let operatoren = document.querySelectorAll('.toggle-buttons input');
let gleichung = document.getElementById('question');
let eingabe = document.getElementById('result');
let formular = document.getElementById('task');
let resultimages = document.querySelectorAll('.resultimage');
let ergebnis;





function generateQuestion() {
    // variable a und variable b zufällig generieren
    // gewählten operator dazwischen setzen
    // Gleichung an setQuestion übergeben

    let question;
    var checkedInput;
    
    let a = Math.ceil(Math.random() * 20);
    let b = Math.ceil(Math.random() * 20);
    

    operatoren.forEach(operator => {
        if (operator.checked) {
            checkedInput = operator;
        }
    });

    switch (checkedInput.id) {
        case "add":
            question = a + " + " + b
            ergebnis = a + b
            break;

        case "subtract":
            if(a < b){
                tmp = a
                a = b 
                b = tmp 
            }
            question =  a + " - " + b
            ergebnis =  a - b
            break;

        case "multiply":
            question =  a + " * " + b
            ergebnis =  a * b
            break;

        case "divide":
            if(a < b){
                tmp = a
                a = b
                b = tmp
            }
            while((a / b).getDecimals() > 1){
                b = b - 1;
            }
            question =  a + " / " + b
            ergebnis =  a / b
            break;

       // case "any":

        default:
            break;
    }


    setQuestion(question);
    console.log(ergebnis);
    
}

function setQuestion(question) {
    // Gleichung in element question schreiben
    gleichung.innerHTML = question;
}

function testResult() {
    // Gleichung aus element question holen
    // Ergebnis berechnen
    // Ergebnis aus result element holen
    // Ergebnis vergleichen
    // testResultOK ausführen wenn identisch, testResultFALSE ausführen wenn nicht.
    if (ergebnis == eingabe.value){
        testResultOK();
    }else{
        testResultFALSE();
    }
}


function testResultOK() {
    // fröhliche katze zeigen
    console.log("OK");
    resultimages.forEach(resultimage => {
        console.log(resultimage);
        if(resultimage.id == "OK"){
            resultimage.classList.remove("hidden");
        } else {
            resultimage.classList.add("hidden");
        }
    });
}

function testResultFALSE() {
    // trauige katze zeigen
    console.log("NOPE");
    resultimages.forEach(resultimage => {
        console.log(resultimage);
        if(resultimage.id == "NOPE"){
            resultimage.classList.remove("hidden");
        } else {
            resultimage.classList.add("hidden");
        }
    });
}

formular.addEventListener('submit', (event)=>{
    event.preventDefault();
    testResult();
})

operatoren.forEach(operator => {
    operator.addEventListener('click', ()=>{
        generateQuestion();
    });    
});









generateQuestion();



