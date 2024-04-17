import UserProfileEdit from "../_components/user/edit/page";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const UserProfile = async () => {
  const session = await getServerAuthSession();
  const userById = await api.user.getById({
    id: session?.user ? session.user.id : "",
  });

  return <>{userById && <UserProfileEdit user={userById} />}</>;
};

export default UserProfile;
