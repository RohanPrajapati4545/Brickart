import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

const AddBricks = () => {

    const { token } = useContext(AuthContext)

    const [brickName, setBrickName] = useState("")
    const [pricePerBrick, setPricePerBrick] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [size, setSize] = useState("")
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const formData = new FormData()

    formData.append("brickName", brickName)
    formData.append("pricePerBrick", pricePerBrick)
    formData.append("category", category)
    formData.append("stock", stock)
    formData.append("description", description)
    formData.append("size", size)
    formData.append("image", image)
    formData.append("video", video)

    const res = await fetch("https://brickart.onrender.com/api/admin/add-brick", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`   
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.msg)
      return
    }

    toast.success(data.msg)

    // reset
    setBrickName("")
    setPricePerBrick("")
    setCategory("")
    setStock("")
    setDescription("")
    setSize("")
    setImage(null)
    setVideo(null)

  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }

    }

    return (
        <div className="container mt-4">
            <h2>Add Brick</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <input
                    className="form-control mb-2"
                    placeholder="Brick Name"
                    value={brickName}
                    onChange={(e) => setBrickName(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    type="number"
                    placeholder="Price"
                    value={pricePerBrick}
                    onChange={(e) => setPricePerBrick(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <input
                    type="file"
                    className="form-control mb-2"
                    
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <input
                    type="file"
                    className="form-control mb-2"
                    
                    onChange={(e) => setVideo(e.target.files[0])}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="btn btn-primary w-100">
                    Add Brick
                </button>

            </form>
        </div>
    )
}

export default AddBricks