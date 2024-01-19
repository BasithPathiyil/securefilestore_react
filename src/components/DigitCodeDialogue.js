import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import api from "../utils/api";

export default function DigitCodeDialogue({ open, setOpen, fileId, fileName }) {
  const [downloadLink, setDownloadLink] = useState(null);
  const cancelButtonRef = useRef(null);
  const [secretKey, setSecretKey] = useState("");
  const handleClickVerify = async () => {
    console.log("fileId", fileId);
    try {
      if (!secretKey) {
        throw new Error("Secret code is mandatory");
      }
      const response = await api.get(
        `/file_upload/get_file?fileId=${fileId}&secretKey=${secretKey}`,
        { responseType: "blob" }
      );
      const blobUrl = URL.createObjectURL(response.data);
      setDownloadLink({ url: blobUrl, fileName });
      setSecretKey("");
    } catch (error) {
      console.log(error);
      const errorData = await error.response.data;
      const errorText = await new Response(errorData).text();
      console.log("Error Text:", errorText);
      const errorObject = JSON.parse(errorText);
      console.log("errorObject", errorObject);
      setDownloadLink(null);
      toast.error(
        errorObject?.error?.message
          ? errorObject?.error?.message
          : error.message
      );
    }
  };
  const handleClickCancel = () => {
    setDownloadLink(null);
    setSecretKey("");
    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Enter your secret code
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          The image can only be download if the secret code
                          matches
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <input
                    type="text"
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter secret code"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleClickVerify()}
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => handleClickCancel()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {downloadLink && (
                    <div className="mt-4 flex items-center justify-center">
                      <a
                        href={downloadLink.url}
                        download={downloadLink.fileName}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        File Ready . Download
                      </a>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
