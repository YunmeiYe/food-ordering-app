import SectionHeaders from "./SectionHeaders"

const ContactUs = () => {
  return (
    <section className="text-center my-8" id="contact">
      <SectionHeaders subHeader={"Don\'t hesitate"} mainHeader={"Contact us"} />
      <div className="mt-8">
        <a href="tel:+61123123123" className="text-4xl underline text-gray-500">+61 123 123 123</a>
      </div>
    </section>
  )
}

export default ContactUs