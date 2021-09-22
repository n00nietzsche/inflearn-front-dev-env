import "./app.css";
import form from "./form.js";
import result from "./result.js";

const resultEl = document.createElement("div");
const formEl = document.createElement("div");

document.addEventListener("DOMContentLoaded", async () => {
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

if (module.hot) {
  console.log("핫모듈 켜짐");

  module.hot.accept("./result.js", async () => {
    console.log("result 모듈 변경됨");
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept("./form.js", () => {
    formEl.innerHTML = form.render();
  });
}
