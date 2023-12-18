"use client"

import React from "react"
import { useUser } from "@clerk/nextjs"

const Profile = () => {
  const { user } = useUser()
  const Profile = user?.profileImageUrl
  const src = Profile
  return (
    <div className="profile-container">
      <section>
        <div className="container py-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="mb-4 flex flex-col  justify-center items-center">
                <img
                  src={Profile}
                  alt="avatar"
                  className="rounded-full w-32 h-32"
                />
                <p className="text-gray-600 text-md mt-2 text-center">
                  Prakirthi ID:0001
                </p>
                <p className="text-gray-600 text-sm mb-4"></p>
                <div className="flex justify-center">
                  <button className="bg-blue-500 border border-gray-500 text-slate-800 py-2 px-5 rounded-full mr-2 hover:bg-gray-200">
                    Edit Profile
                  </button>
                  <button className="border border-gray-500 text-slate-800  py-2 px-4 rounded-full hover:bg-gray-200">
                    Contact support
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Full Name</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">{user?.fullName}</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Email</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">
                        {user?.emailAddresses.toString().trim() !== ""
                          ? user?.emailAddresses.toString()
                          : "Undefined"}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Phone</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">
                        {user?.phoneNumbers.toString().trim() !== ""
                          ? user?.phoneNumbers.toString()
                          : "Undefined"}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Address</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Palani</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Phenotype</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Vata</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Gender</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">Male</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Height</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">180cm</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Weight</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">72 kg</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <p>Blood group</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-600">O+ve</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
