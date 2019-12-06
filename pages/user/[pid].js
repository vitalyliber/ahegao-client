import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <p>User: {pid}</p>;
};

export default User;
