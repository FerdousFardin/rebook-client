import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrimaryBtn from "../../../../components/Buttons/PrimaryBtn";
// import PrimaryBtn from '@components/Button/index.tsx';
// PrimaryBtn

// type DrawerProps = {
//   title?: string,
//   description?: string,
//   children: React.ReactNode,
//   isOpen: boolean,
//  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
// }
const handleClick = () => setIsOpen(!isOpen);

export default function Drawer({
  title = "",
  description = "",
  children,
  isOpen,
  setIsOpen,
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={() => setIsOpen(false)}
        className="fixed top-14 z-30 inset-0 overflow-y-auto"
      >
        <div className="flex w-3/4 h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="z-40 fixed inset-0 bg-gray-500" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className={`flex flex-col justify-between bg-gray-50 z-50
                          w-full max-w-sm p-6 overflow-hidden text-left
                          align-middle shadow-xl rounded-r-2xl`}
            >
              <div>
                <Dialog.Title className="font-bold text-2xl md:text-4xl text-blue-500">
                  {title}
                </Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
