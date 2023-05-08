
const ignoreWords = ["ist","sind","bin","seid","bist","werden","werde","wird","werdet","werdest","wurde","wurden","wurdet","wurdest","als","wie","dass","auch","nur","wegen","von","aus","auf","in","im","zu","zum","zur","an","am","mit","ohne","die","der","das","den","dem","dessen","denen","deren","des","ihm","ihr","ihn","ihnen","ihre","ihrem","ihren","sein","seinem","seinen","seiner","euch","uns","sich","mich","sie","er","es","wir","ich","ihr","und","auch","\n"," ","-",","];
var allText = "";
var sentences = [];
async function loadText(url) {
        try {
        const response = await fetch(url);
        const data = await response.text();
        allText = data;
        sentences = allText.split(".");
        newSentence();
        } catch (err) {
        console.error(err);
        }
    }
    function newSentence(){
        var text = sentences[Math.floor(Math.random()*sentences.length)];
        var words = text.split(" ");
        var wordCount = Math.floor(words.length/2);
        var start = 1+Math.round(Math.random()*(words.length-wordCount));
        var newText = "";
        var prompt = [];
        for(let i = 0;i<words.length;i++){
            if(i<start || i>(start+wordCount)){
                newText+=words[i]+" ";
            }else{
                var bareWord = words[i].replace(",","").replace(".","").replace("\n","").toLowerCase();
                if(!ignoreWords.includes(bareWord)){
                    prompt.push(bareWord);
                    newText+="__________";
                    if(words[i].includes("\n")){
                        newText+="\n";
                    }
                }
            }
        }
        prompt.sort();
        newText+=".";
        text+=".";
        document.getElementById("sentence").innerText = newText;
        document.getElementById("spoiler").innerText = text;
        document.getElementById("prompt").innerText = "(" + prompt.join(", ") + ")";
  }
  document.addEventListener("load",loadText("text.txt"));