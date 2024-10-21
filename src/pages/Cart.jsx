import React, { useContext } from 'react'
import { CartContext } from '../App'

function Cart() {

  const { cart, setCart } = useContext(CartContext);

  function handleRemove(id, color) {
    let copied = [...cart];
    copied = copied.filter(function (valuee) {
      return valuee.id != id && valuee.color != color;
    })

    setCart(copied);
    localStorage.setItem("cart", JSON.stringify(copied))
  }

  function handleChangeCount() {
    
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
      {
        cart.length > 0 && cart.map((value, index) => (
          <div key={index} className="flex justify-between items-center mb-6 pb-10 border-b border-gray-300">
            <div className="w-1/4">
              <img
                className="w-full h-40 rounded-lg object-cover shadow-md"
                src={value.data.attributes.image}
                alt={value.data.attributes.title}
              />
            </div>
            <div className="w-1/3 px-4">
              <h3 className="text-lg font-semibold">{value.data.attributes.title}</h3>
              <h4 className="text-sm text-gray-500">{value.data.attributes.company}</h4>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-2">Color:</span>
                <span
                  className="inline-block w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: value.color }}
                ></span>
              </div>
            </div>
            <div className="w-1/4 text-center flex flex-col items-center gap-2">
              <label className="text-gray-500 text-sm block mb-1">Amount</label>
              <select onChange={(e) => {handleChangeCount(e.target.value, value.id, value.color)}} className='w-40 py-2 px-2 border border-gray-300 rounded-lg' value={value.count}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button
                className="text-blue-500 text-sm underline cursor-pointer"
                onClick={() => { handleRemove(value.id) }}
              >
                remove
              </button>
            </div>
            <div className="w-1/5 text-right">
              <h3 className="text-lg font-bold">${value.data.attributes.price}</h3>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Cart
