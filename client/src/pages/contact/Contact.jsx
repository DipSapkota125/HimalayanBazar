import React from "react";

const Contact = () => {
  return (
    <div className="font-sans bg-base container mx-auto md:p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4 ">
          <form className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl text-gray-500 md:text-2xl lg:text-3xl font-bold mb-4">
              Contact Us
            </h2>
            <div className="flex mb-4">
              <div className="w-full md:w-1/2 pr-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none  focus:border-gray-500"
                />
              </div>
              <div className="w-full md:w-1/2 pr-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-gray-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-gray-500"
            ></textarea>
            <button className="font-sans bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full">
              Send
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-4 mt-10 md:pl-10 md:mt-0">
          <div className="staticContent undefined bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl text-gray-500 font-bold mb-4">
              CONTACT DETAILS
            </h1>
            <div className="mb-2">
              <strong className="text-gray-500">Email:</strong>{" "}
              &nbsp;infosapkota800@gmail.com
            </div>
            <div className="mb-2">
              <strong className="text-gray-500">Address:</strong>{" "}
              &nbsp;Dillibazar, Kathmandu, Nepal
            </div>
            <div className="mb-2">
              <strong className="text-gray-500">Website:</strong>
              &nbsp;&nbsp;
              <a
                href="https://www.youtube.com"
                target="_blank"
                className="text-blue-500 underline"
              >
                www.youtube.com
              </a>
            </div>
            <div className="mb-2">
              <strong className="text-gray-500">Phone:</strong>{" "}
              &nbsp;+977-01567845 &nbsp;/ 9861315260
            </div>
            <div className="mb-2">
              <strong className="text-gray-500">
                HIMALAYAN MARKETPLACE Pvt. Ltd. &nbsp;
              </strong>
            </div>
          </div>
          <div className="mt-6">
            <iframe
              title="myFrame"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.399787860299!2d85.32634227520572!3d27.70494007618394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a74d6ee495%3A0x7f4d91c7478c536a!2sDillibazar%20Pipal%20Bot!5e0!3m2!1sen!2snp!4v1689848020147!5m2!1sen!2snp"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowfullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
