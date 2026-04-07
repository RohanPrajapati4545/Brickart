import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

const ManageBricks = () => {

    const [bricks, setBricks] = useState([])
    const [singleBrick, setSingleBrick] = useState({})
    const { token } = useContext(AuthContext)
    const getBricks = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/get-all-bricks", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.msg)
                return
            }

            setBricks(data.data)

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    const deleteBrick = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/delete-brick/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.msg)
                return
            }

            toast.success(data.msg)

            // 🔥 UI update without reload
            setBricks(prev => prev.filter(item => item._id !== id))

        } catch (error) {
            console.log(error)
            toast.error("Delete failed")
        }
    }

    const updateBrick = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(
                `http://localhost:5000/api/admin/update-brick/${singleBrick._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(singleBrick)
                }
            )

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.msg)
                return
            }

            toast.success(data.msg)

            // UI update
            setBricks(prev =>
                prev.map(item =>
                    item._id === singleBrick._id ? data.brick : item
                )
            )

        } catch (error) {
            console.log(error)
            toast.error("Update failed")
        }
    }

    useEffect(() => {
        if (token) {
            getBricks()
        }
    }, [token])


    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Bricks</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Brick Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Size</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>video</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            bricks.length > 0 ? (
                                bricks.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.brickName}</td>
                                        <td>₹{item.pricePerBrick} per brick</td>
                                        <td>{item.category}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.size}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:5000/uploads/${item.image}`}
                                                alt="brick"
                                                width="60"
                                                height="60"
                                                style={{ objectFit: "cover" }}/>
                                        </td>
                                        <td>
                                            <video width="100" height="100" controls>
                                            <source src={`http://localhost:5000/uploads/${item.video}`} />
                                        </video>
                                        </td>

                                        <td>
                                            <button className='btn btn-danger' onClick={() => deleteBrick(item._id)}>Delete</button>
                                            <button
                                                className='btn btn-primary ms-2'
                                                onClick={() => setSingleBrick(item)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#myModal">
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No Data Found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


            <form onSubmit={updateBrick}>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Edit Brick</h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>

                            <div className="modal-body">

                                <input
                                    className="form-control mb-2"
                                    placeholder="Brick Name"
                                    value={singleBrick?.brickName || ""}
                                    onChange={(e) => setSingleBrick({ ...singleBrick, brickName: e.target.value })}
                                />

                                <input
                                    className="form-control mb-2"
                                    placeholder="Price"
                                    value={singleBrick?.pricePerBrick || ""}
                                    onChange={(e) => setSingleBrick({ ...singleBrick, pricePerBrick: e.target.value })}
                                />

                                <input
                                    className="form-control mb-2"
                                    placeholder="Category"
                                    value={singleBrick?.category || ""}
                                    onChange={(e) => setSingleBrick({ ...singleBrick, category: e.target.value })}
                                />

                                <input
                                    className="form-control mb-2"
                                    placeholder="Stock"
                                    value={singleBrick?.stock || ""}
                                    onChange={(e) => setSingleBrick({ ...singleBrick, stock: e.target.value })}
                                />

                                <input
                                    className="form-control mb-2"
                                    placeholder="Size"
                                    value={singleBrick?.size || ""}
                                    onChange={(e) => setSingleBrick({ ...singleBrick, size: e.target.value })}
                                />

                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    value={singleBrick?.description || ""}
                                    onChange={(e) => setSingleBrick({ ...singleBrick, description: e.target.value })}
                                />

                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-bs-dismiss="modal"
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ManageBricks