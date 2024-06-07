import { api } from "~/trpc/server";
import GigCard from "~/app/_components/gigs/GigCard";
import BaseButton from "~/app/_components/base/BaseButton";
import AreYouMusician from "~/app/_components/user/edit/AreYouMusician";
import {
  EnvelopeIcon,
  PhoneIcon,
  MusicalNoteIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

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

  const smColumns = ["Name", "Date", "Venue"];

  return (
    <div className="flex min-h-screen flex-col items-center gap-3 pt-4 text-[.8rem] sm:gap-4 sm:text-[1rem]">
      <div className="flex w-fit flex-col items-end self-end px-4 uppercase">
        {musician && <h2 className="font-thin">Gig List For</h2>}
        <div className="flex items-center gap-4">
          <BaseButton
            className="h-4 w-4 sm:h-5 sm:w-5"
            as="link"
            href={`/user/${user?.id}/edit`}
          >
            <PencilSquareIcon />
          </BaseButton>

          <h2 className="text-[.9rem] font-black sm:text-[1.2rem]">
            {user?.name}
          </h2>
        </div>
        <hr className="mt-3 w-full sm:mt-4"></hr>
      </div>
      <div className="flex w-fit flex-col gap-2 self-end px-4 pb-4 text-[.65rem]  sm:gap-4 sm:text-[.8rem]">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className=" h-3 w-3 sm:h-4 sm:w-4" />

            <span>{user?.email}</span>
          </div>
          {(user?.phoneNumber ??
            user?.musician?.phoneNumber) && (
              <div className="flex items-center gap-2">
                <PhoneIcon className=" h-3 w-3 sm:h-4 sm:w-4" />
                <span>{user?.phoneNumber ?? user?.musician?.phoneNumber}</span>
              </div>
            )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              {musician?.instruments.map((inst) => (
                <div
                  className="flex items-center gap-2"
                  key={`profile-edit-${inst.instrument.name}`}
                >
                  <MusicalNoteIcon className=" h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{inst.instrument.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {musician && (
        <div className="w-[96%] text-[.57rem] sm:w-[90%] sm:text-[.7rem]">
          <div className="hidden w-full justify-between border py-1 uppercase sm:flex sm:pl-2 sm:pr-[55px]">
            {lgColumns.map((row) => (
              <span
                key={row}
                className={row !== "Pay" ? "w-[15.5%]" : "w-[7%]"}
              >
                {row}
              </span>
            ))}
          </div>
          <div className="flex w-full justify-between border px-2 py-1 uppercase sm:hidden">
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
      )}

      <AreYouMusician user={user} />
    </div>
  );
};

export default UserProfile;
