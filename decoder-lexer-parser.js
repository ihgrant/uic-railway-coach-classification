const decoderForm = document.getElementById("decoder");

decoderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formValues = new FormData(event.target);
  const code = formValues.get("code");
  const locale = formValues.get("locale");
  const classification = getClassification(code, locale);
  console.log(classification);

  const outputList = document.getElementById("output");
  classification.forEach((entry) => {
    let li = document.createElement("li");
    li.textContent = entry;
    outputList.appendChild(li);
  });
});

const { createToken, Lexer } = chevrotain;

const MainLetters = createToken({
  name: "MainLetters",
  pattern:
    /(A|B|AB|AR|BC|BF|BR|AD|BD|D|DA|DB|DD|DD|Post|F|F|FR|BPost|DPost|WG|WGS|SR|Salon|WR|WL|K|Z|Z)/,
});
const SecondaryLettersDB = createToken({
  name: "SecondaryLettersDB",
  pattern: /(m|l|n|y|x|p|v|o|i|c|d|k|a|r|s|b|h|z|u|uu|q|f)/,
});
const Dash = createToken({
  name: "Dash",
  pattern: /-/,
  group: Lexer.SKIPPED,
});

let UICCoachLexer = new Lexer([MainLetters, SecondaryLettersDB, Dash]);

function getClassification(code, locale) {
  const result = UICCoachLexer.tokenize(code);
  console.log(result);
  return [];
}
