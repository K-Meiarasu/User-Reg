var DetectLanguage = require('detectlanguage')
var detectlanguage = new DetectLanguage("e291e72cac0af694cf437df95a050196")

var text = "தமிழ்"

detectlanguage.detect(text).then(function(result){
    console.log(result)
})