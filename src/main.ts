import { UAParser as UAParserV1 } from "ua-parser-js-1";
import { UAParser as UAParserV2 } from "ua-parser-js-2";
import { UAParser as MyUaParser } from 'my-ua-parser'
import { diffJson } from "diff";
import "@picocss/pico";
import "./style.css";

const calcDiff = (id: string, result1: any, result2: any) => {
  const diff = diffJson(result1, result2);

  const diffElement = document.getElementById(id);
  const fragment = document.createDocumentFragment();

  diff.forEach((part) => {
    const elem = document.createElement(part.added ? "ins" : part.removed ? "del" : "span");
    elem.appendChild(document.createTextNode(part.value));
    fragment.appendChild(elem);
  });

  diffElement?.appendChild(fragment);
}


(async () => {
  //
  // Load UAParser V1
  //

  const parser_v1 = new UAParserV1();

  const results_v1 = parser_v1.getResult();

  //
  // Load UAParser V2
  //

  const parser_v2 = new UAParserV2();

  const results_v2 = await parser_v2.getResult().withClientHints();

  //
  // Load my-ua-parser
  //

  const parser_my = new MyUaParser();
  const results_my = parser_my.getResult();

  //
  // Calculate Diff
  //

  calcDiff("diff", results_v1, results_v2);

  calcDiff("diff-my-ua-parser", results_v1, results_my);
  
  
})();

