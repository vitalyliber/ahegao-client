const updatePost = setData => post => {
  setData(actualData => ({
    ...actualData,
    ...post
  }));
};

export default updatePost;
