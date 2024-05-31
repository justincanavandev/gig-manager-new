import { api } from "~/trpc/server";
import GigCard from "~/app/_components/gigs/GigCard";
import BaseButton from "~/app/_components/base/BaseButton";
import AreYouMusician from "~/app/_components/user/edit/AreYouMusician";

const UserProfile = async ({ params }: { params: { userId: string } }) => {
  const user = await api.user.getById({
    id: params.userId,
  });

  const musician = user?.musician ? user.musician : null;

  const lgColumns = [
    "Name",
    "Date",
    "Start Time",
    "End Time",
    "Venue",
    "Pay",
    "Organizer",
  ];

  const smColumns = [
    "Name",
    "Date",
    "Venue",
  ]

  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
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
      <div className="w-[96%] sm:w-[90%]">
      <div className="hidden sm:flex w-full justify-between border sm:pl-2 py-1 text-[.7rem] uppercase pr-[50px]">
        {lgColumns.map((row) => (
          <span key={row} className={row !== "Pay" ? "w-[15.5%]" : "w-[7%]"}>
            {row}
          </span>
        ))}
      </div>
      <div className="flex w-full justify-between border px-2 py-1 text-[.7rem] uppercase sm:hidden">
        {smColumns.map((row) => (
          <span key={row} className="w-[33.33%]">
            {row}
          </span>
        ))}
      </div>
      {musician?.gigs.map((gig, index) => (
        <GigCard
          key={`userProfile-gig-${gig.gig.id}`}
          gig={gig.gig}
          index={index}
        />
      ))}
      </div>

      <BaseButton as="link" href={`/user/${user?.id}/edit`}>
        Edit Profile
      </BaseButton>

      <AreYouMusician user={user} />
    </div>
  );
};

export default UserProfile;
