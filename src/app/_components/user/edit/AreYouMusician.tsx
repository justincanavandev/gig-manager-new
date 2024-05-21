"use client";

import { type GetUserById } from "~/server/types/userTypes";
import UserProfileEdit from "./UserProfileEdit";
import { useBoolean } from "usehooks-ts";

const AreYouMusician = ({ user }: { user: GetUserById }) => {
  const { value: musicianModal, setTrue: closeMusicianModal } = useBoolean(
    !!user?.musician,
  );

  return (
    <div>
      {!musicianModal && (
        <>
          <span>
            Are you a musician? Enter your details here to join our database!
          </span>
          <UserProfileEdit
            user={user}
            musicianAdd={true}
            closeMusicianModal={closeMusicianModal}
          />
        </>
      )}
    </div>
  );
};

export default AreYouMusician;
