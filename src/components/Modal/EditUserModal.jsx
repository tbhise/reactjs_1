import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState,useEffect } from "react";

export default function EditUserModal({
  isModalOpen,
  userData,
  handleClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || "",
  });

  useEffect(() => {
    setFormData({
      fullName: userData.fullName || "",
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...userData, ...formData }); // Pass updated user to parent
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Modal content container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="w-full max-w-lg bg-white rounded-lg p-6 shadow-xl transition-all"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-user-title"
              aria-describedby="edit-user-description"
            >
              <h2 id="edit-user-title" className="text-lg font-semibold">
                Edit User
              </h2>
              <p
                id="edit-user-description"
                className="text-sm text-gray-500 mb-4"
              >
                Make changes to the user information below.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    name="fullName"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
