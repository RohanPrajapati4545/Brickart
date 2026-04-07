import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

const AllUsers = () => {

  const [users, setUsers] = useState([])
  const { token } = useContext(AuthContext)

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/all-users", {
        method: "GET",
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

      setUsers(data)

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [token])

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Users</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            
            </tr>
          </thead>

          <tbody>
            {
              users.length > 0 ? (
                users.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Users Found</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers