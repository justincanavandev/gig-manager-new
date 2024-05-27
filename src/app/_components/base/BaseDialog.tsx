import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { ComponentPropsWithRef } from "react";

interface BaseDialogProps extends ComponentPropsWithRef<"dialog"> {
  message: string;
  open: boolean;
  title: string;
  closeModal: () => void;
}

const BaseDialog = ({
  message,
  open,
  closeModal,
  children,
}: BaseDialogProps) => {
  return (
    <Dialog as="div" open={open} onClose={closeModal} className="z-50">
      <div aria-hidden="true" className="fixed inset-0 backdrop-blur-[3px] flex w-screen items-center justify-center "/>
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="max-w-lg border shadow-lg flex flex-col gap-4 justify-evenly bg-gray-200 rounded-md px-8 pb-8 relative">
          <p className="text-black pt-2 text-center uppercase">{message}</p>
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 h-6 w-6 text-black"
          >
        
            <XMarkIcon />
          </button>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BaseDialog;
