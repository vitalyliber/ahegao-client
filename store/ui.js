export default store => {
  const initState = { ui: { burgerVisible: false } };

  store.on("@init", () => initState);

  store.on("ui/toggleBurger", ({ ui: { burgerVisible } }) => {
    return { ui: { burgerVisible: !burgerVisible } };
  });

  store.on("ui/hideBurger", () => {
    return { ui: { burgerVisible: false } };
  });
};
