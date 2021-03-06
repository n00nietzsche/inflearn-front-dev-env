// 기존에 전역 스코프에 math 프로퍼티가 사용되고 있었다면,
// 기존 객체를 참조한다.
import axios from "axios";

const math = window.math || {};

(function () {
  function sum(a, b) {
    return a + b;
  }

  math.sum = sum;
  axios.get("http://localhost:8080/api");
})();
