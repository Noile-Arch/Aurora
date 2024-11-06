import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="w-full h-full  px-4 md:px-10  lg:px-20">
      <div className="w-full h-full flex justify-start items-center">
        <div className="w-[500px] h-full flex-col justify-start items-center">
          <div className="w-full flex justify-start gap-2 py-2 items-center text-chocolate">
            <FaPhoneAlt
              size={30}
              className="p-2 rounded-full bg-chocolate/40"
            />
            <p className="">+254-123456789</p>
          </div>
          <div className="w-full flex justify-start gap-2 py-2 items-center text-chocolate">
            <MdOutlineEmail
              size={30}
              className="p-2 rounded-full bg-chocolate/40"
            />
            <p className="">aurora@gmail.com</p>
          </div>
          <h1 className="font-bold text-lg">Send us a message</h1>
          <form
            action=""
            className="w-full h-full py-4 flex flex-col justify-start items-start gap-4"
          >
            <div className="w-full flex justify-between gap-4 items-center">
              <input
                className="outline-none bg-white rounded-lg px-4 py-2 border border-gray-200"
                type="text"
                name=""
                id=""
                placeholder="Name"
              />
              <input
                className="outline-none bg-white rounded-lg px-4 py-2 border border-gray-200"
                type="text"
                name=""
                id=""
                placeholder="Phone"
              />
            </div>
            <input
              className="outline-none w-full  bg-white rounded-lg px-4 py-2 border border-gray-200"
              type="email"
              name=""
              id=""
              placeholder="Email address"
            />
            <textarea
              className="outline-none w-full h-[200px]  bg-white rounded-lg px-4 py-2 border border-gray-200"
              name=""
              id=""
              placeholder="message"
            ></textarea>
            <button className="px-6 py-2 mt-4 font-semibold bg-chocolate text-white font-sans rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
