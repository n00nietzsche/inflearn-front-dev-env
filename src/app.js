import "./app.css";

import form from "./form.js";
import result from "./result.js";

console.log("hello world");

document.addEventListener("DOMContentLoaded", async () => {
  const formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  const resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});
