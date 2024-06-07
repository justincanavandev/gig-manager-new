"use client";

import { type GetUserById } from "~/server/types/userTypes";
import UserProfileEdit from "./UserProfileEdit";
import { useBoolean } from "usehooks-ts";
import BaseDialog from "../../base/BaseDialog";
import BaseButton from "../../base/BaseButton";

const AreYouMusician = ({ user }: { user: GetUserById }) => {
  const { value: musicianModal, setTrue: closeMusicianModal } = useBoolean(
    !!user?.musician,
  );

  const {
    value: addMusician,
    setTrue: openAddMusician,
    setFalse: closeAddMusician,
  } = useBoolean(false);


  return (
    <div>
      {!musicianModal && (
        <>
          <div className="flex flex-col items-center gap-4 rounded-md border p-6 sm:p-8">
            <span className="text-[1.3rem] uppercase sm:text-[1.5rem]">
              Are you a musician?
            </span>
            <span>Click below to be added to our database!</span>
            <BaseButton onClick={openAddMusician} as="button">
              JOIN HERE!
            </BaseButton>
          </div>
          <BaseDialog
            open={addMusician}
            message="Add Musician"
            closeModal={closeAddMusician}
          >
            <UserProfileEdit
              user={user}
              musicianAdd={true}
              closeMusicianModal={closeMusicianModal}
            />
          </BaseDialog>
        </>
      )}
    </div>
  );
};

export default AreYouMusician;
