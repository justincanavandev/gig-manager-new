import UserProfileEdit from "~/app/_components/user/edit/UserProfileEdit";
import { api } from "~/trpc/server";

const EditProfile = async ({ params }: { params: { userId: string } }) => {
  const user = await api.user.getById({
    id: params.userId,
  });

  return (
    <div className="min-h-screen mt-8">
      <UserProfileEdit user={user} />
    </div>
  );
};

export default EditProfile;
