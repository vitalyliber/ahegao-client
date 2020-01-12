const breakpointCols = isMobile => {
  return { default: isMobile ? 1 : 3, 1100: 2, 700: 2, 500: 1 };
};

export default breakpointCols;
