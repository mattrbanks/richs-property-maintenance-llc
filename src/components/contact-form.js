import React from "react";
import { Helmet } from "react-helmet";
import Recaptcha from "react-recaptcha";

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

const ContactForm = () => {
  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);

  function handleImageChange(event) {
    if (!event.target.files[0]) {
      setFile(file);
    } else {
      let imageCopy = URL.createObjectURL(event.target.files[0]).slice();
      setFile(imageCopy);
      setImage(event.target.files[0]);
    }
  }

  const contactInfo = {
    name,
    email,
    message,
    phone,
    subject,
    image, // This is currently optional and will be an empty string if the user does not attach an image of the job.
  };

  function handleSubmit(event) {
    if (isVerified) {
      fetch("/", {
        method: "POST",
        body: encode({ "form-name": "contact", ...contactInfo }),
      })
        .then(() => alert("Success!"))
        .catch((error) => alert(error));

      event.preventDefault();
      console.log(contactInfo);
      console.log(typeof contactInfo.image);
      console.log(image.name);
    } else {
      event.preventDefault();
      alert("Please verify that you are a human!");
    }
  }

  function recaptchaLoaded() {
    console.log("recaptcha successfully loaded");
  }

  function verifyCallback(response) {
    if (response) {
      setIsVerified(true);
    } else {
      console.log("not verified!!!");
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <script
          src={`https://www.google.com/recaptcha/api.js?r=${Math.random()}`}
          async
          defer
        ></script>
      </Helmet>

      <div className="block mx-auto w-3/4 my-6">
        <div>
          <div>
            {/* <h2>
              This will display block above the contact form on small screens
              portrait
            </h2> */}
            <p className="mr-4 mb-4 text-xl lg:text-2xl">
              Contact us and get a quote today
            </p>
          </div>
        </div>
        <div className="lg:flex">
          <form
            className="w-full max-w-lg"
            onSubmit={handleSubmit}
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-4/5 md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name="name"
                  type="text"
                  placeholder="full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="w-4/5 md:w-1/2 px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="subject"
                  type="text"
                  placeholder="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                ></input>
              </div>
              <div className="w-4/5 md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name="phone"
                  type="text"
                  placeholder="(xxx) xxx-xxxx"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </div>
              <div className="w-4/5 md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="email"
                  type="email"
                  placeholder="youraddress@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-4/5 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                  name="message"
                  placeholder="type your message..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex">
              <div>
                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Attach an image of the job you want done
                </p>
                <div className="bg-grey-lighter">
                  <label className="w-56 mb-4 flex flex-col items-center px-4 py-6 bg-white text-blue-800 rounded-lg shadow-lg tracking-wide uppercase border border-blue-800 cursor-pointer hover:bg-blue-800 hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      name="image"
                    />
                  </label>
                </div>
              </div>
              <div className="mx-6">
                <div>
                  <img src={file} />
                </div>
              </div>
            </div>
            <Recaptcha
              sitekey="6LeS-1gaAAAAAPB1fBoYlD4ocOJ2SYA9_rg1VmWf"
              render="explicit"
              onloadCallback={recaptchaLoaded}
              verifyCallback={verifyCallback}
            />
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button
                  type="submit"
                  className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                  Send
                </button>
              </div>
              <div className="md:w-2/3"></div>
            </div>
          </form>
          <div>
            <ul className="space-y-10 ml-4 lg:ml-16 mt-8 list-decimal lg:text-2xl">
              <li>
                <p>Use this form to book a job with us.</p>
              </li>
              <li>
                <p>Attach a picture of the job you want us to do.</p>
              </li>
              <li>
                <p>We will get back to you ASAP.</p>
              </li>
              <li>
                <p>Thank you!</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
