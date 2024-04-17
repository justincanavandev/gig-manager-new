// import UserProfileEdit from "~/app/_components/user/UserProfileEdit";
import { api } from "~/trpc/server";

const UserProfile = async ({ params }: { params: { userId: string } }) => {
  const user = await api.user.getById({
    id: params.userId,
  });

  const musician = user?.musician ? user.musician : null;

  return (
    <div className="flex flex-col items-center">
      <span>{user?.name}</span>
      <span>{user?.email}</span>
      {musician?.instruments.map((inst) => (
        <span key={`profile-edit-${inst.instrument.name}`}>
          {inst.instrument.name}
        </span>
      ))}
      {/* <UserProfileEdit user={user} /> */}
    </div>
  );
};

export default UserProfile;
