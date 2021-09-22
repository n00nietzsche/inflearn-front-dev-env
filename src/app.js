import form from "./form.js";
import result from "./result.js";

console.log("Abc12123312");

document.addEventListener("DOMContentLoaded", async () => {
  const formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  const resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

if (module.hot) {
  console.log("핫모듈 켜짐");
}

// console.log("module", module);
