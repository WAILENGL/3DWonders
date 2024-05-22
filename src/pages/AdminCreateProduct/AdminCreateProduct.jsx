import { useState } from "react";
import { createProduct } from "../../utilities/product-service";

export default function AdminCreateProduct()
{
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        picture: ''
      });

    const [displayMsg, setdisplayMsg] = useState("");
    const handleChange = (event) =>
    {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const response = await createProduct(formData)
        if(response)
        {
          setdisplayMsg("Product Create Successfully")
        }
        
    }

    return (
    // <div>
    //     <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
    //     <label>
    //       Title:
    //       <input className="border-4 border-indigo-500/100" type="text" name="title" value={formData.title} onChange={handleChange} />
    //     </label>
    //     <br />
    //     <label>
    //       Description:
    //       <input  className="border-4 border-indigo-500/100" type="text" name="description" value={formData.description} onChange={handleChange} />
    //     </label>
    //     <br />
    //     <label>
    //       Price:
    //       <input className="border-4 border-indigo-500/100" type="number" name="price" value={formData.price} onChange={handleChange} />
    //     </label>
    //     <br />
    //     <label>
    //       Picture:
    //       <input className="border-4 border-indigo-500/100" type="text" name="picture" value={formData.picture} onChange={handleChange} />
    //     </label>
    //     <br />
    //     <button type="submit" className="border-solid border-2 border-sky-500">Submit your product</button>
    //   </form></div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create Your Product Here
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title} onChange={handleChange}
              style={{textIndent:"10px"}}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            description
            </label>
          </div>
          <div className="mt-2">
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description} onChange={handleChange}
              style={{textIndent:"10px"}}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Price
            </label>
          </div>
          <div className="mt-2">
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price} onChange={handleChange}
              style={{textIndent:"10px"}}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

    
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="picture" className="block text-sm font-medium leading-6 text-gray-900">
            Picture
            </label>
          </div>
          <div className="mt-2">
            <input
              id="picture"
              name="picture"
              type="text"
              value={formData.picture} onChange={handleChange}
              style={{textIndent:"10px"}}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <p className="flex w-full justify-center text-green-700">{displayMsg}</p>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
        <p className="flex w-full justify-center text-red-700">{}</p>
      </form>
    </div>
  </div>
      )
}