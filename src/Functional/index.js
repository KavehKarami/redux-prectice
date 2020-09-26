import { compose, pipe } from "lodash/fp";
import { produce } from "immer";

//* without functional programing
let input = "     Kaveh Karami      ";
let output = "<div>" + input + "</div>";

//* with functional programing
let trim = (str) => str.trim();
// let wrapInDiv = ( str) => `<${div}>${str}</${div}>`;
let wrap = (type) => (str) => `<${type}>${str}</${type}>`;
let toLowerCase = (str) => str.toLowerCase();

// let result = wrapInDiv(toLowerCase(trim(input)));
// console.log(result);

//* trim code with lodash (we have a lot of pranteces and we have to read right to left); {pipe} -> left to right; {compose} -> right to left
let transform = pipe(trim, toLowerCase, wrap("span"));
let lodashResult = transform(input);
console.log(lodashResult);

const person = {
  forename: "kaveh",
  surname: "karami",
  address: {
    city: "arak",
    country: "iran",
  },
};
const updated = {
  ...person,
  forename: "kasra",
  address: { ...person.address, city: "tehran" },
};

console.log(person);
console.log(updated);

let book = { title: "Harry Potter" };
function publish(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublish = true;
  });
}
const bookUpdated = publish(book);
console.log(book);
console.log(bookUpdated);
