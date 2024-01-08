import RightArrowIcon from "@/icons/RightArrowIcon"
import { Button } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"

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
          <Button href="/" as={Link} color="primary" className="uppercase px-4 py-2 rounded-full" endContent={<RightArrowIcon className={"w-6"} />}>Order now</Button>
          <Button className="bg-transparent text-gray-600 font-semibold" endContent={<RightArrowIcon className={"w-6"} />}>Learn more</Button>
        </div>
      </div>
      <div className="relative">
        <Image src={"/assets/pizza.png"} alt={"pizza"} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority className="object-contain" />
      </div>
    </section>
  )
}

export default Hero