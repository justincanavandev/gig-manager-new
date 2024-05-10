import UserProfileEdit from "~/app/_components/user/edit/UserProfileEdit";
import { api } from "~/trpc/server";
import GigCard from "~/app/_components/gigs/GigCard";

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
      <h3>Instruments:</h3>
      {musician?.instruments.map((inst) => (
        <span key={`profile-edit-${inst.instrument.name}`}>
          {inst.instrument.name}
        </span>
      ))}
      <h2>Gig List</h2>
      {musician?.gigs.map((gig, index) => (
        <GigCard
          key={`userProfile-gig-${gig.gig.id}`}
          gig={gig.gig}
          index={index}
        />
      ))}

      {musician === null && (
        <div>
          {" "}
          Are you a musician? Enter your details here to join our database!
          <UserProfileEdit user={user} />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
