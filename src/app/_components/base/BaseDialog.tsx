import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { ComponentPropsWithRef } from "react";
import { Fragment } from "react";

interface BaseDialogProps extends ComponentPropsWithRef<"dialog"> {
  message: string;
  open: boolean;
  title?: string;
  closeModal: () => void;
}

const BaseDialog = ({
  message,
  open,
  closeModal,
  children,
}: BaseDialogProps) => {

  return (
    <Transition show={open}>
      <Dialog as="div" onClose={closeModal} className="z-50 ">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="backdrop-blur-none"
          enterTo="backdrop-blur-[3px]"
          leave="ease-in duration-200"
          leaveFrom="backdrop-blur-[3px]"
          leaveTo="backdrop-blur-none"
        >
          <div
            aria-hidden="true"
            className="fixed inset-0 flex w-screen items-center justify-center backdrop-blur-[3px]"
          />
        </Transition.Child>

        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <Transition.Child
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative flex max-w-lg flex-col justify-evenly gap-4 rounded-md border bg-gradient-jc px-8 pb-8 shadow-lg">
              <p className="pt-2 text-center text-[1.3rem] font-bold uppercase">
                {message}
              </p>
              <button
                onClick={closeModal}
                className="absolute right-2 top-2 h-6 w-6"
              >
                <XMarkIcon />
              </button>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BaseDialog;
