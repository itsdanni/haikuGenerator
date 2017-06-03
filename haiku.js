
var fs = require('fs');

function shuffle(arr){
  var remain = arr.length;
  while (remain){
    var i = Math.floor(Math.random() * remain--);
    var temp = arr[i];
    arr[i] = arr[remain];
    arr[remain] = temp;
  }
  return arr;
}

function countSyllables(syllables){
  var count = 0;
  syllables.forEach(function(syllable){
    if (syllable.charAt(syllable.length - 1) === '0' || syllable.charAt(syllable.length - 1) === '1'){
      count++;
    }
  });
  return count;
}

function makeSyllables(){
  var data = fs.readFileSync('./cmudict.txt').toString();
  var linesArr = data.toString().split('\n');
  var syllablesArr = [];
  for (var i = 0; i < linesArr.length - 5; i++){
    var lineSplit = linesArr[i].split('  '); //[word, sh shs sh]
    var syllables = lineSplit[1].split(' '); //[sh, sh, sh]
    var count = countSyllables(syllables);
    if (!Array.isArray(syllablesArr[count])){
      syllablesArr[count] = [];
    }
    syllablesArr[count].push(lineSplit[0]);
  }
  return syllablesArr;
}

//returns a random haiku structure array
function structGenerator(){
  var struct = [[], [], []];
  var countArr = [5, 7, 5];
  for (var i = 0; i < 2; i++){
    var remain = countArr[i];
    while (remain > 0){
      var num = (Math.ceil(Math.random() * remain));
      struct[i].push(num);
      remain -= num;
    }
  }
  struct[2] = shuffle(struct[0]);
  return struct;
}

function createHaiku(){
  var structure = structGenerator();
  var syllablesArr = makeSyllables();
  var haikuArr = structure.map(function(numArr){
    var haikuLine = numArr.map(function(num){
      var word = shuffle(syllablesArr[num])[0];
      if (word.charAt(word.length - 3) === '('){
        word = word.substring(0, word.length - 3);
      }
      return word;
    }); //array of haiku words
    return haikuLine.join(' ');
  });
  return haikuArr.join('\n');
}

module.exports = {
  createHaiku: createHaiku,
};


