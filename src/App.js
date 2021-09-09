import { createElement } from "react";
import data from "./example.json";

function RecursiveComponent({ id, el, title, children, ...rest }) {
  return createElement(el, {
    ...rest,
    children:
      typeof children === "string"
        ? children
        : Array.isArray(children)
        ? children?.map((el) => <RecursiveComponent {...el} key={el.id} />)
        : null,
  });
}

function App() {
  return <RecursiveComponent {...data} />;
}

export default App;
