"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus(); // useFormStatus is a new react hook that help us to get information regarding the form, It must be used in a component that renders inside a form, not just the component that contains the form
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
