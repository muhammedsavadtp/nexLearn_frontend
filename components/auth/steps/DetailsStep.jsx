import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X } from "lucide-react";
import { createProfile } from "@/lib/redux/slices/authThunks";
import { useRouter } from "next/navigation";

const DetailsStep = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { mobile } = useSelector((state) => state.auth);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreateProfile = async () => {
    const formData = new FormData();
    formData.append("mobile", mobile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("qualification", qualification);
    formData.append("profile_image", image);

    try {
      await dispatch(createProfile(formData)).unwrap();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Add Your Details</h2>

      {/* Profile Image Uploader */}
      <div className="flex justify-center">
        <div className="relative group">
          <input
            type="file"
            id="profile"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />

          {image ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="profile"
              className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-gray-400 mb-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>

              <span className="text-[10px] text-gray-400 mt-1 text-center leading-tight">
                Add Your Profile picture
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <Input
          label="Name*"
          placeholder="Enter your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          placeholder="Enter your Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Your qualification*"
          placeholder="Select qualification"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />
      </div>

      <Button onClick={handleCreateProfile}>Get Started</Button>
    </div>
  );
};

export default DetailsStep;
