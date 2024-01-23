import { FaceBookIcon } from "@/icons/FaceBookIcon"
import { InstaIcon } from "@/icons/InstaIcon"
import { LocationIcon } from "@/icons/LocationIcon"
import { MailIcon } from "@/icons/MailIcon"
import { PhoneIcon } from "@/icons/PhoneIcon"
import { TwitterIcon } from "@/icons/TwitterIcon"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-950 pt-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-6 px-10 lg:px-48">
        <div className="col-span-full lg:col-span-1 lg:block">
          <Link href="/" className='text-primary text-2xl font-josefin'>Pizza Fiesta</Link>
          <div className="mt-6 flex gap-6">
            <TwitterIcon className={"w-6"} />
            <FaceBookIcon className={"w-6"} />
            <InstaIcon className={"w-6"}/>
          </div>
        </div>
        
        <div>
          <h4 className="uppercase">About Us</h4>
          <p className="mt-6 text-gray-400">
          Passionate about delivering unforgettable pizza experiences with every savory slice we create.</p>
        </div>

        <div>
          <h4 className="uppercase">Opening Hours</h4>
          <p className="mt-6 text-gray-400">
            Monday - Friday</p>
          <p className="mt-2 text-gray-400">8:00am - 9:00pm</p>
        </div>

        <div>
          <h4 className="uppercase">Services</h4>
          <div className="mt-6 grid space-y-2 text-gray-400">
            <p><a className="inline-flex gap-x-2 hover:text-gray-200" href="/">Dine-In</a></p>
            <p><a className="inline-flex gap-x-2 hover:text-gray-200" href="/">Online Ordering</a></p>
            <p><a className="inline-flex gap-x-2 hover:text-gray-200" href="/">Catering</a></p>
            <p><a className="inline-flex gap-x-2 hover:text-gray-200" href="/">Specialty Pizzas</a></p>
          </div>
        </div>

        <div>
          <h4 className="uppercase">Have a question?</h4>
          <div className="mt-6 text-gray-400">
            <ul className="space-y-2">
              <li className="inline-flex space-x-4">
                <span><LocationIcon className={"w-6"} /></span>
                <span>20 Graham Rd, Malvern WR14 2HL, United Kingdom</span>
              </li>
              <li className="inline-flex space-x-4">
                <span><PhoneIcon className={"w-6"} /></span>
                <span>+44 168 4892 229</span>
              </li>
              <li className="inline-flex space-x-4">
                <span><MailIcon className={"w-6"} /></span>
                <span>info@pizzafiesta.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-700 text-center">
      <p className="mt-4 text-gray-400">Copyright &copy; {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer