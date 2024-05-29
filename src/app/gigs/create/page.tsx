import GigForm from "~/app/_components/gigs/create/GigForm";

const GigCreate = async () => {
  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="flex w-full">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-[1.6rem]">Create A Gig!</h1>
    
            <GigForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default GigCreate;
