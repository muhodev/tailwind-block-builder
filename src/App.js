import { createElement, Fragment, useEffect, useState, memo } from "react";
import cn from "classnames";
import { makeRecursiveData } from "./utils";
import content from "./example.json";

const RecursiveComponent = memo(function RecursiveCom({
  id,
  el,
  className = "",
  title,
  text,
  children,
  selected,
  onClick,
  onMouseOver,
  hovered,
  ...rest
}) {
  const renderChildren = () => {
    if (Array.isArray(children)) {
      return children.map((c) => (
        <RecursiveComponent
          {...c}
          key={c?.id}
          selected={selected}
          hovered={hovered}
          onClick={onClick}
          onMouseOver={onMouseOver}
        />
      ));
    }
    if (text) {
      return [<Fragment key={`${id}-${el}-text-el`}>{text}</Fragment>];
    }
    return [];
  };
  return createElement(el, {
    ...rest,
    "data-title": title,
    className: cn(className, "relative"),
    id: id,
    selected,
    style: selected?.id === id ? { position: "relative" } : {},
    children:
      selected?.id === id
        ? [
            ...renderChildren(),
            <span
              key={`${id}-selected`}
              className="absolute w-full h-full top-0 left-0 right-0 bottom-0 pointer-events-none border border-blue-400"
            >
              <span className="rounded-sm absolute bottom-full left-0 bg-blue-400 text-white text-xs font-medium px-2 py-0.5 h-5 truncate pointer-events-none z-50">
                {el}#{id}
              </span>
            </span>,
          ]
        : hovered?.id === id
        ? [
            ...renderChildren(),
            <span
              key={`${id}-selected`}
              className="absolute w-full h-full top-0 left-0 right-0 bottom-0 pointer-events-none border border-blue-400"
            >
              <span className="rounded-sm absolute bottom-full left-0 border-blue-400 text-blue-400 text-xs font-medium px-2 py-0.5 h-5 truncate pointer-events-none z-40">
                {el}#{id}
              </span>
            </span>,
          ]
        : renderChildren(),
    onClick: (e) => onClick({ id }, e),
    onMouseOver: (e) => onMouseOver({ id }, e),
  });
});

function App() {
  const [state, setState] = useState([]);
  const [blocks, setBlocks] = useState(content);
  const [selectedEl, setSelectedEl] = useState(null);
  const [hoveredEl, setHoveredEl] = useState(null);

  const [blockInfo, setBlockInfo] = useState(null);

  useEffect(() => {
    setState(makeRecursiveData(blocks, undefined));
  }, [blocks]);

  const addBlock = () => {
    const copyState = JSON.parse(JSON.stringify(state));
    copyState[copyState?.length - 1].children.push({
      id: `deneme-${copyState[copyState?.length - 1].children?.length}`,
      title: "Deneme",
      el: "div",
      className: "w-full bg-gray-100 h-10 border",
      children: null,
    });
    setState(copyState);
  };
  return (
    <div
      className="relative w-full min-h-screen"
      onClick={() => setSelectedEl(null)}
      onMouseOver={() => setHoveredEl(null)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          const selectedBlock = blocks.find(
            (block) => block.id === selectedEl.id
          );
          const parentBlock = blocks.find(
            (block) => block.id === selectedBlock.parent
          );
          setSelectedEl(parentBlock);
        }
        if (e.key === "ArrowDown") {
          const selectedBlock = blocks.find(
            (block) => block.id === selectedEl.id
          );
          const childrenBlock = blocks.find(
            (block) => block.parent === selectedBlock.id
          );
          setSelectedEl(childrenBlock);
        }
        console.log(e);
      }}
    >
      {state.map((data, index) => (
        <Fragment key={index}>
          <RecursiveComponent
            onClick={(payload, e) => {
              e.stopPropagation();
              setSelectedEl(payload);
            }}
            onMouseOver={(payload, e) => {
              e.stopPropagation();
              setHoveredEl(payload);
            }}
            selected={selectedEl}
            hovered={hoveredEl}
            {...data}
          />
        </Fragment>
      ))}
      <button onClick={addBlock}>Add Block</button>
    </div>
  );
}

export default App;
