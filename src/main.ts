import { UAParser as UAParserV1 } from "ua-parser-js-1";
import { UAParser as UAParserV2 } from "ua-parser-js-2";
import { diffJson } from "diff";
import "@picocss/pico";
import "./style.css";

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
  // Calculate Diff
  //

  const diff = diffJson(results_v1, results_v2);

  const diffElement = document.getElementById("diff");
  const fragment = document.createDocumentFragment();

  diff.forEach((part) => {
    const elem = document.createElement(part.added ? "ins" : part.removed ? "del" : "span");
    elem.appendChild(document.createTextNode(part.value));
    fragment.appendChild(elem);
  });

  diffElement?.appendChild(fragment);
})();
