import GigForm from "~/app/_components/gigs/create/GigForm";

const GigCreate = async () => {
  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="w-auto">
          <h1 className="text-[1.6rem]">Create a gig!</h1>

          <GigForm />
        </div>
      </div>
    </>
  );
};

export default GigCreate;
