const updatePostInList = setData => post => {
  setData(actualData => ({
    ...actualData,
    products: actualData.products.map(el =>
      el.id === post.id ? { ...el, liked: post.liked } : el
    )
  }));
};

export default updatePostInList;
