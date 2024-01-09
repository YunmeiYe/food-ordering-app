import SectionHeaders from "./SectionHeaders"

const AboutUs = () => {
  return (
    <section className="text-center my-16" id="about">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
      <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
        <p>
          At Pizza Fiesta, our story is a delightful journey of passion and flavor.
          It all began with a love for crafting the perfect pizza, blending tradition with innovation.
          Our chefs, inspired by the rich culinary heritage of Italy, handpick the finest ingredients
          to create mouthwatering masterpieces. From our artisanal crusts to the delectable toppings,
          each pizza tells a tale of dedication and quality.
        </p>
        <p>
          With a commitment to excellence, we've built a community that cherishes every slice.
          Join us on this gastronomic adventure, where every order is a chapter in our story—a story of taste,
          tradition, and the joy of sharing exceptional food
        </p>
      </div>
    </section>
  )
}

export default AboutUs