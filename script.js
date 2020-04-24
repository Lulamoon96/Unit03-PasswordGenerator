// Check if at least one checkbox is checked
var checkboxes = document.querySelectorAll('input[type="checkbox"]')
var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked)


// Array of characters for the password
var upLet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var lowLet = "abcdefghijklmnopqrstuvwxyz"
var nums = "0123456789"
var symbs = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
var allChars = [upLet, lowLet, nums, symbs]

// Calling the buttons
var generateB = document.getElementById("generate")
var copyB = document.getElementById("copy")

// Checking which boxes are ticked
var upper = document.getElementById("uppercase").checked
var lower = document.getElementById("lowercase").checked
var numb = document.getElementById("numbers").checked
var symb = document.getElementById("symbols").checked
var checked = [upper, lower, numb, symb]

// DEBUG: Checking to see if called my boxes right
// function checkBox(event) {

//     event.preventDefault()
//     upper = document.getElementById("uppercase").checked
//     lower = document.getElementById("lowercase").checked
//     numb = document.getElementById("numbers").checked
//     symb = document.getElementById("symbols").checked
//     checked = [upper, lower, numb, symb]

//     checked.forEach(function(bool, i) {

//         alert(allChars[i] + " " + bool)

//     })

// }
// var checkB = document.getElementById("check")
// checkB.addEventListener("click", checkBox)

// Method for generating a random number between 0 and max
function getRandomInt(max) {

    return Math.floor(Math.random() * Math.floor(max));

}

// Generates the character set to be used for the password based on user selected options
function charSetMake() {

    upper = document.getElementById("uppercase").checked
    lower = document.getElementById("lowercase").checked
    numb = document.getElementById("numbers").checked
    symb = document.getElementById("symbols").checked
    checked = [upper, lower, numb, symb]
    var charSet = [] 

    checked.forEach(function(bool, i){

        if (bool) {

            charSet.push(allChars[i])

            }
        
        }
    )
    
    return charSet

}

// DEBUG: See if my charset is being made correctly
// function charSetMakeCall(event){

//     event.preventDefault()
//     console.log(charSetMake())

// }
// var chars = document.getElementById("chars")
// chars.addEventListener("click", charSetMakeCall)

//Set the current password to the generated password and add it to the list of passwords
function append(pass) {

    var passStore = document.getElementById("passStore")
    store = document.getElementById("passStore")
    var newPass = document.createElement("li")
    newPass.innerHTML = pass
    passStore.append(newPass)
    
    var space = document.createElement("li")
    space.innerHTML = "<br>"
    passStore.append(space)

    document.getElementById("currPass").textContent = pass

}

function copyPass() {

    var copyText = document.getElementById("currPass");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert("Copied the password to clipboard")

  }

// The function that will generate the passsword
function createPassword(event) {

    event.preventDefault()
    checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked)
    var length = document.getElementById("length").value
    var chars = charSetMake()
    var charAccess = chars.length
    var password = ""

// Ensures at least one option is chosen
    if (checkedOne !== true) {

        alert("Please select at least one option.")
        return

    }

//Ensures a valid length is used
    if (length < 8 || length > 128) {

        alert("Please enter a valid length")
        return

    }

// Iterates through chosen character sets randomly and adds to password
    for (i = 0; i < length; i++) {

        var locat = chars[getRandomInt(charAccess)]
        var character = locat[getRandomInt(locat.length)]
        password = password.concat(character)

    }

    append(password)

}

copyB.addEventListener("click", copyPass)
generateB.addEventListener("click", createPassword)
