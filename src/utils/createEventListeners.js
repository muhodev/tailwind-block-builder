export const createEventListeners = ({
  children,
  id,
  title,
  document,
  setSelectedEl,
}) => {
  document.getElementById(id).addEventListener("click", (e) => {
    e.stopPropagation();
    setSelectedEl({ id, title });
    console.log(id, "clicked");
  });
  if (Array.isArray(children)) {
    children.forEach((child) => {
      createEventListeners({ ...child });
    });
  }
};
