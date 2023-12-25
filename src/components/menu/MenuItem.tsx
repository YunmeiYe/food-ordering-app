const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
      <img src="/assets/pizza.png" alt="pizza" className="max-h-24 mx-auto"/>
      </div>

    <h4 className="font-semibold text-xl my-3">
      Peperroni Pizza
    </h4>
    <p className="text-gray-500 text-sm">
      some genral text here some genral text here
    </p>
    <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
      Add to cart $12
    </button>
  </div>
  )
}

export default MenuItem