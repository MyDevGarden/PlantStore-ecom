import React from "react";
import Layout from "../components/BasicLayout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - plantstore app"}>
      <div className="row contactus">
        <h1 className="bg-success p2 text-white text-center">CONTACT US</h1>
        <div className="m-3 p-3" style={{ border: "1px solid, black" }}>
          <img
            src="./images/contact.jpg"
            alt="contact"
            style={{ width: "100%" }}
          />
        </div>
        <div className="m-3" style={{ border: "1px solid, black" }}>
          <p className="text-justify mt-2">
            For any query or help please feel free to call
          </p>
          <p className="mt-3">
            <BiMailSend /> : helpdesk@mydreams.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91- 9885225252
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
