import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrimaryBtn from "../Buttons/PrimaryBtn";

function Cookie() {
  const open = JSON.parse(localStorage.getItem("cookiePreference"))
    ? false
    : true;
  const [isOpen, setIsOpen] = useState(open);

  function closeModal(accept) {
    localStorage.setItem("cookiePreference", JSON.stringify(accept));
    setIsOpen(false);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 delay-1000"
          enterFrom="translate-y-full opacity-0"
          enterTo="opacity-100 translate-y-0 duration-500"
          leave="ease-in translate-y-full duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-10"
        >
          <Dialog.Panel className="w-full p-5 lg:px-24 fixed bottom-0 bg-gray-200 bg-opacity-50 backdrop-blur-2xl">
            <div className="md:flex items-center -mx-3">
              <div className="md:flex-1 px-3 mb-5 md:mb-0">
                <p className="text-center md:text-left text-gray-900 text-xs leading-tight md:pr-12">
                  We and selected partners and related companies, use cookies
                  and similar technologies as specified in our Cookies Policy.
                  You agree to consent to the use of these technologies by
                  clicking Accept, or by continuing to browse this website. You
                  can learn more about how we use cookies and set cookie
                  preferences in Settings.
                </p>
              </div>
              <div className="flex h-10 gap-5">
                <PrimaryBtn
                  shouldPrevent={true}
                  className={"bg-transparent"}
                  onClick={() => closeModal(false)}
                >
                  Reject
                </PrimaryBtn>

                <PrimaryBtn
                  shouldPrevent={true}
                  onClick={() => closeModal(true)}
                  className={"bg-primary-100"}
                >
                  Accept cookies
                </PrimaryBtn>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Cookie;
