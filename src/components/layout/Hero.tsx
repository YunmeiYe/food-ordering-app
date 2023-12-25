import RightArrow from "@/icons/RightArrow"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything<br />
          is better<br />
          with a &nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life.
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Order now
            <RightArrow className={"w-6"} />

          </button>
          <button className="flex gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <RightArrow className={"w-6"} />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image src={"/assets/pizza.png"} alt={"pizza"} fill className="object-contain" />
      </div>
    </section>
  )
}

export default Hero