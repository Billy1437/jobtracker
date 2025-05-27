import React, { useState } from 'react'

import FormModal from './FormModal'


type Application ={
    id: number,
    company?:string,
    position? :string,
    appliedDate? :string,
    status?: 'Applied' | 'Interviewing' | 'Rejected' | 'Offered',
    note? :string
}



const ApplicationsTable = () => {

    const [isModalOpen,setisModalOpen] = useState(false);
    const [editingApp,setEditingApp] = useState<Application | null>(null)
    const [applications,setApplications] = useState<Application[]>([
        {
        id : 1,
        company: 'TechCorp',
        position: 'Software Engineer',
        appliedDate: '2023-08-15',
        status: 'Applied',
        note: 'Followed up with recruiter',
        },
        {
        id: 2,
        company: 'TechCorp',
        position: 'Software Engineer',
        appliedDate: '2023-08-15',
        status: 'Applied',
        note: 'Followed up with recruiter',
        },
])

    const openAddModal = () => {
        setEditingApp(null)
        setisModalOpen(true)
    }

    const openEditModal = (app: Application) => {
        setEditingApp(app)
        setisModalOpen(true)
    }

    const onClose = () => {
        setisModalOpen(false)
        setEditingApp(null)
    }

    





  return (
    <div className='md:mt-4 md:mx-4'>

        <div className='flex justify-between'>
        <h1 className='text-3xl font-bold '>My Applications</h1>
        <button onClick={openAddModal} className='px-6 py-2 bg-gray-800 text-white rounded-lg active:bg-gray-500'>Add </button>
        </div>



        {/* search and filter */} 
        <div className="relative md:py-3">
          <input
            type="text"
            placeholder="Search by company or position"
            className="pl-10 pr-4 py-2 rounded-lg border bg-[#F0f2f5] w-full focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-transparent transition duration-200"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        

        {/* options */}
        <div className='md:pt-3'>
        <div className='flex flex-wrap md:gap-3 '>
            <select name="" id="" className='md:px-4 py-2 bg-[#F0f2f5] rounded-lg'>
                <option value="">Status : All</option>
                <option value="">Applied</option>
                <option value="">Interviewing</option>
                <option value="">Rejected</option>
            </select>

            <select name="" id="" className='md:px-4 py-2 bg-[#F0f2f5] rounded-lg'>
                <option value="">Date : All</option>
                <option value="">Last 7 days</option>
                <option value="">Last 30 days</option>
                
            </select>

            <select name="" id="" className='md:px-4 py-2 bg-[#F0f2f5] rounded-lg'>
                <option value="">Location : All</option>
                <option value="">Remote</option>
                <option value="">On-site</option>
            </select>
        </div>
        </div>

        {/* table */}
        <div className='md:pt-3'>
        <div className='rounded-lg bg-white shadow-sm border overflow-hidden'>
        <div className=' overflow-x-auto '>
            <table className='min-w-full'>
                <thead className=' border-b '>
                    <tr className='text-left'>
                        <th className='px-4 py-3 font-semibold'>Company</th>
                        <th className='px-4 py-3 font-semibold'>Position</th>
                        <th className='px-4 py-3 font-semibold'>Application Date</th>
                        <th className='px-4 py-3 font-semibold'>Status</th>
                        <th className='px-4 py-3 font-semibold'>Notes</th>
                        <th className='px-4 py-3 font-semibold'>Actions</th>


                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {applications.map((app,index) => 
                    <tr key={index} className='text-left hover:bg-gray-50'>
                        <td className='px-4 py-3 '>
                            <p>{app.company}</p>
                        </td>
                        <td className='px-4 py-3 '>
                            <p>{app.position}</p>
                        </td>
                        <td className='px-4 py-3 '>
                            <p>{app.appliedDate}</p>
                        </td>
                        <td className=''>
                            <span className='px-6 py-2 font-semibold bg-[#F0F2F5] rounded-xl'>
                                {app.status}
                            </span>
                        </td>
                        <td className='px-4 py-3 '>
                            <p>{app.note}</p>
                        </td>
                        <td className='px-4 py-3'>
                            <div className='flex gap-2'>
                                <button className='bg-gray-900 px-2 rounded-xl text-white active:bg-gray-600' 
                                onClick={() => openEditModal(app)}>Edit</button>
                                <button className='bg-red-600 px-2 rounded-xl text-white active:bg-red-400'>Delete</button>
                            </div>
                        </td>
                    </tr>

                    )}

                </tbody>
            </table>
        </div>
        </div>
        </div>


        <FormModal
        isOpen={isModalOpen}
        onClose={onClose}
        initialData={editingApp ?? null}
        title={editingApp ? 'Edit Application' : 'Add Application'}
        buttonText={editingApp ? 'Update': 'Add'}
        />








        </div>

        



        










   
  )
}

export default ApplicationsTable