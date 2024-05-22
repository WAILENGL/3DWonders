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

    const handleChange = (event) =>
    {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    }

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        createProduct(formData)
    }

    return (<div>
        <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
        <label>
          Title:
          <input className="border-4 border-indigo-500/100" type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input  className="border-4 border-indigo-500/100" type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price:
          <input className="border-4 border-indigo-500/100" type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Picture:
          <input className="border-4 border-indigo-500/100" type="text" name="picture" value={formData.picture} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className="border-solid border-2 border-sky-500">Submit your product</button>
      </form></div>)
}