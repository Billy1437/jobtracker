import React, { useEffect, useState } from 'react'

import FormModal from './FormModal'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import 'dotenv'


export type Application = {
    _id?: string,
    company?: string,
    position?: string,
    appliedDate?: string,
    status?: 'Applied' | 'Interviewing' | 'Rejected' | 'Offered',
    notes?: string
}





const ApplicationsTable = () => {

    const [isModalOpen,setisModalOpen] = useState(false);
    const [editingApp,setEditingApp] = useState<Application | null>(null)
    const [applications,setApplications] = useState<Application[]>([
        ])
    const [currentUser,setCurrentUser] = useState<any>(null)

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if(userData){
            setCurrentUser(JSON.parse(userData))
        }
    },[])


    // date
    const formatDisplayDate = (isoString?: string): string => {
        if (!isoString) return '';
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return ''; 

        // Format to a more user-friendly string, e.g., "MM/DD/YYYY"
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
         return date.toLocaleDateString(undefined, options); 
         
        };


    



    const handleSubmitForm = async (formData : Application) => {
    try{

        const serverUrl = import.meta.env.VITE_SERVER_URL;

        const token = localStorage.getItem('token')

        if(!token){
            alert('Please login to continue')
            window.location.href = "/login"
            return;
        }

      


        const headers:HeadersInit ={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }


        if(editingApp){
            const response = await fetch(`${serverUrl}/api/application/${editingApp._id}`,
                {method : 'PUT',
                    headers,
                    body: JSON.stringify(formData)
                }
            )

            if(!response.ok){

                if(response.status === 401){
                    localStorage.removeItem('token')
                    alert('Session expired.Please login again')
                    window.location.href = "/login"
                    return;
                }
                throw new Error('Failed to update application.')
            }
            const responseData = await response.json()
            const updatedApp = responseData.data

            // update field

            setApplications((prev) => prev.map(app => app._id == updatedApp.id ? updatedApp : app ));

        }else{
            // create new
            const response = await fetch(`${serverUrl}/api/application`,
                {method : 'POST',
                    headers,
                    body : JSON.stringify(formData)
                }
            )
            if(!response.ok){
                throw new Error('Failed to create application.')

            }
            const responseData = await response.json()
            const newApp = responseData.data

            setApplications(prev => [...prev,newApp])
        }



        

        // close after success
        onClose();
        
    }catch(error){
        console.error('Error submitting form:', error);
        alert('Failed to save application. Please try again.');
    }

    }

    const handleDelete = async (id:string) => {
        if(!window.confirm('Are you sure you want to delete this application?')){
            return
        }

        try{
            const serverUrl = import.meta.env.VITE_SERVER_URL;
            const token = localStorage.getItem('token')

            const response = await fetch(`${serverUrl}/api/application/${id}`,{
                method : 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })

            if(!response.ok){
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
                throw new Error('Failed to delete application.')
            }

            // remove application
            setApplications(prev => prev.filter(app => app._id !== id) )
        }catch(error){
            console.error('Error deleting application:', error);
            alert('Failed to delete application. Please try again.');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = "/login"
    }




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

    
    const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Interviewing":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Offered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const fetchApplications = async() => {
        try{
            const serverUrl = import.meta.env.VITE_SERVER_URL;
            const token = localStorage.getItem('token')

            if (!token) {
                window.location.href = '/login';
                return;
            }
            const response = await fetch(`${serverUrl}/api/application`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(!response.ok){
                if(response.status == 401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    return;
                }
                throw new Error('Failed to fetch application.')
            }

             const responseData = await response.json(); 
            const applications = responseData.data; 
                setApplications(applications)



        }catch(error){
            console.error('Error fetching applications:', error);

        }
        }

        useEffect(() => {
    
        fetchApplications()
    
        } , [fetchApplications])

    

  return (
    <div className='space-y-4 sm:space-y-6'>

        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <h1 className='text-2xl sm:text-3xl font-bold '>My Applications</h1>
        {applications.length > 0 && (
            <button onClick={openAddModal} className='flex items-center justify-center gap-2 px-4 py-2
        bg-gray-800 text-white w-full sm:w-auto transition-colors active:bg-gray-600 hover:bg-gray-700 rounded-lg'>
            <Plus className='w-4 h-4'/>
            Add Application </button>   
        )}
        
        </div>



        {/* search and filter */} 
        <div className="relative ">
          <input
            type="text"
            placeholder="Search by company or position"
            className="pl-10 pr-4 py-2 rounded-lg border bg-[#F0f2f5] w-full focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-transparent transition duration-200"
          />
          <Search className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2'/>
        </div>
        

        {/* options */}
        <div className=''>
        <div className='flex flex-wrap space-x-1 sm:space-x-3'>
            <select name="" id="" className='py-2 bg-[#F0f2f5] rounded-lg border-0 focus:ring-2 
            focus:ring-gray-800 transition-all'>
                <option value="">Status : All</option>
                <option value="">Applied</option>
                <option value="">Interviewing</option>
                <option value="">Rejected</option>
            </select>

            <select name="" id="" className=' py-2 bg-[#F0f2f5] rounded-lg border-0 focus:ring-2 
            focus:ring-gray-800 transition-all'>
                <option value="">Date : All</option>
                <option value="">Last 7 days</option>
                <option value="">Last 30 days</option>
                
            </select>

            <select name="" id="" className='py-2 bg-[#F0f2f5] rounded-lg border-0 focus:ring-2 
            focus:ring-gray-800 transition-all'>
                <option value="">Location : All</option>
                <option value="">Remote</option>
                <option value="">On-site</option>
            </select>
        </div>
        </div>

        {/* desktop table */}
        <div className='hidden lg:block'>
        <div className='rounded-lg bg-white shadow-sm border overflow-hidden'>
        <div className=' overflow-x-auto'>
            <table className='min-w-full'>
                <thead className='bg-gray-50 border-b '>
                    <tr className='text-left'>
                        <th className='px-6 py-4 font-semibold'>Company</th>
                        <th className='px-6 py-4 font-semibold'>Position</th>
                        <th className='px-6 py-4 font-semibold'>Application Date</th>
                        <th className='px-6 py-4 font-semibold'>Status</th>
                        <th className='px-6 py-4 font-semibold'>Notes</th>
                        <th className='px-6 py-4 font-semibold'>Actions</th>


                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {applications.map((app,index) => 
                    <tr key={index} className='text-left hover:bg-gray-50'>
                        <td className='px-6 py-4 '>
                            <p>{app.company}</p>
                        </td>
                        <td className='px-6 py-4 '>
                            <p>{app.position}</p>
                        </td>
                        <td className='px-6 py-4 '>
                            <p>{formatDisplayDate(app.appliedDate)}</p>
                        </td>
                        <td className='px-6 py-4'>
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full 
                                ${getStatusColor(app.status || "")}`}>
                                {app.status}
                            </span>
                        </td>
                        <td className='px-6 py-4 '>
                            <p>{app.notes}</p>
                        </td>
                        <td className='px-6 py-4'>
                            <div className='flex gap-2'>
                                <button className='bg-gray-900 inline-flex items-center px-3 py-1 rounded-xl text-white 
                                active:bg-gray-600' 
                                onClick={() => openEditModal(app)}><Edit className='w-3 h-3 mr-1'/>Edit</button>

                                <button onClick={() => handleDelete(app._id!)} 
                                className='bg-red-600 inline-flex items-center px-3 py-1 rounded-xl text-white active:bg-red-400'>
                                    <Trash2 className='w-3 h-3 mr-1'/>Delete</button>
                            </div>
                        </td>
                    </tr>

                    )}

                </tbody>
            </table>
        </div>
        </div>
        </div>
        

        {/* mobile cards */}
        <div className='lg:hidden space-y-4'>
            {applications.map((app,index) => (
                <div key={index} className='bg-white rounded-lg shadow-sm border p-4 space-y-3'>
                    <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                            <h3 className='font-semibold text-gray-900 text-lg'>{app.company}</h3>
                            <p className='text-gray-600'>{app.position}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                            ${getStatusColor(app.status || "")}`}>
                                {app.status}
                            </span>
                    </div>
                    <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                            <span className='text-gray-500'>Applied:</span>
                            <span className='text-gray-900'>{formatDisplayDate(app.appliedDate)}</span>
                        </div>
                        {app.notes && (
                            <div>
                                <span className='text-gray-500'>Notes:</span>
                                <p className='text-gray-900 mt-1'>{app.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className='flex gap-2 pt-2'>
                         <button

                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                        onClick={() => openEditModal(app)}
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                    </button>
                     <button 
                     onClick={() => handleDelete(app._id!)}
                     className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                     <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                     </button>
                    </div>
                    
                </div>
            ))}
        </div>


        {/* empty state */}
        {applications.length == 0 && (
            <div className='text-center py-12'>
                <div className='text-gray-400 text-lg mb-2'>No application yet</div>
                <p className='text-gray-500 mb-4'>Start tracking your job applications</p>
                <button
                onClick={openAddModal}
                className='inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white
                rounded-lg hover:bg-gray-700 transition-colors'>
                     <Plus className="w-4 h-4" />
                        Add Your First Application
                </button>


            </div>
        )}



        <FormModal
        isOpen={isModalOpen}
        onSubmit={handleSubmitForm}
        onClose={onClose}
        initialData={editingApp ?? null}
        title={editingApp ? 'Update Application' : 'Add Application'}
        buttonText={editingApp ? 'Update': 'Add'}
        />


        </div>

        



        










   
  )
}

export default ApplicationsTable