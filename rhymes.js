// Tessa Adams rhymes.js

// get relevant dom elements
const queryInputElem = document.getElementById('query');

const frigginForm = document.getElementById('vestigial');

frigginForm.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

function sizeTheWords() {
  const variableSizeResults = document.querySelectorAll(".result.imperfect");
  variableSizeResults.forEach((result) => {
    const resultScore = parseInt(result.dataset.score, 10);
    result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
  });
}
// add event listener to know when to search

queryInputElem.addEventListener('keyup', async function(ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter')

    const rhymeResultsResp = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`);
    console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();

    console.log(rhymeResults);
    // document.write(rhymeResults);
    const rhymeResultsElems = rhymeResults.map((rhymeWord) => {
      const resultElem = document.createElement("div");
      resultElem.classList.add("result");
      resultElem.classList.add("imperfect");
      resultElem.dataset.score = rhymeWord.score;
      resultElem.append(rhymeWord.word);
      //resultElem.append(resultSpan)
      return resultElem;
    })
    const resultsContainer = document.getElementById("results");;
    Array.from(resultsContainer.childNodes).forEach((child) => {
      child.remove();
    });
    resultsContainer.append(...rhymeResultsElems);  
    sizeTheWords();  
  }   
});


// write function that searches the rhyme API given a (string) query (likely you should use the fetch API)

// write function that:
//  1. expects array of word object results 
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page