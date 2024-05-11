import UserProfileEdit from "~/app/_components/user/edit/UserProfileEdit";
import { api } from "~/trpc/server";

const EditProfile = async ({ params }: { params: { userId: string } }) => {

    const user = await api.user.getById({
        id: params.userId,
      });

  return <UserProfileEdit user={user} />
  
};

export default EditProfile;
