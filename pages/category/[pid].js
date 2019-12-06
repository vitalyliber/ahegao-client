import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Category: {pid}</p>;
};

export default Category;
