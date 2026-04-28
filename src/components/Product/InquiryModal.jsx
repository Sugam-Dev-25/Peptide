import { useForm } from "react-hook-form";

const InquiryModal = ({ product, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "http://peptide.local/wp-json/custom/v1/inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            product_id: product.id,
            product_name: product.name,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("✅ Inquiry sent successfully!");
        reset(); // form clear
        onClose();
      } else {
        alert("❌ Failed to send inquiry");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error sending inquiry");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[600px] p-10 shadow-2xl">

        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-4xl font-bold text-[#071A2D] py-2">
            Let’s Talk About This Product
          </h2>
          <p className="text-md text-[#071A2D] mt-1 py-1">
            Ask anything about{" "}
            <span className="font-medium text-[#FDC700]">
              {product?.name}
            </span>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* NAME */}
          <div>
            <input
              placeholder="Name"
              className="w-full border border-gray-300 p-3 outline-none"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              placeholder="Email"
              className="w-full border border-gray-300 p-3 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-3 outline-none"
              {...register("phone", {
                required: "Phone is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              placeholder="Write Message..."
              rows={4}
              className="w-full border border-gray-300 p-3 outline-none"
              {...register("message", {
                required: "Message is required",
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#FDC700] text-[#FDC700] cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#071A2D] text-[#FDC700] px-5 py-2 shadow-md cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;