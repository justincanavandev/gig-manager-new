import UserProfileEdit from "~/app/_components/user/UserProfileEdit";
import { api } from "~/trpc/server";

const UserProfile = async ({ params }: { params: { userId: string } }) => {
  const user = await api.user.getById({
    id: params.userId,
  });

  const musician = user?.musician ? user.musician : null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col">
        <span>{user?.name}</span>
        <span>{user?.email}</span>
      </div>
      {musician?.instruments.map((inst) => (
        <span key={`profile-edit-${inst.instrument.name}`}>
          {inst.instrument.name}
        </span>
      ))}
      {user?.musician === null &&
      <div> Are you a musician? Enter your details here to join our database!
      <UserProfileEdit user={user} />
      </div>}
    </div>
  );
};

export default UserProfile;
