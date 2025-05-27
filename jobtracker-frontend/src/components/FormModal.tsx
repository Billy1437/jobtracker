import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';


interface FormModalProps{
  isOpen :boolean;
  onClose : () => void;
  title? :string;
  onSubmit :(data : {company : string; position:string; appliedDate : string; status : string; note:string}) => void;
  initialData? : {
    company? : string;
    position? :string;
    status?: string;
    appliedDate? :string
    note? :string
  } | null;
  buttonText : string;
  
}




const FormModal:React.FC<FormModalProps> = ({isOpen,onClose,title,onSubmit,initialData,buttonText}) => {

  const [company,setCompany] = useState(initialData?.company || '');
  const [position, setPosition] = useState(initialData?.position || '');
  const [appliedDate,setAppliedDate] = useState(initialData?.appliedDate || '');
  const [status,setStatus] = useState(initialData?.status || 'Applied');
  const [note,setNote] = useState(initialData?.note || '')


  useEffect(() => {
    if(initialData){
      setCompany(initialData.company ?? '');
      setPosition(initialData.position ?? '');
      setAppliedDate(initialData.appliedDate ?? '');
      setStatus(initialData.status ?? '');
      setNote(initialData.note ?? '');
    }else{
      setCompany('');
      setPosition('');
      setAppliedDate('');
      setStatus('Applied')
      setNote('')
    }

  }, [initialData,isOpen])

  

  if(!isOpen) return null;

  const handleSubmit = () => {
    if(!company && !position){
      alert("please fill in all the required fields")
      return;

    }
    onSubmit({company,position,appliedDate,status,note})
  }

 
  

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>

          
            <div className=' flex justify-between items-center border-b p-6'>
              <h2 className='text-xl fontbold text-gray-900'>
                {title}
              </h2>
              <button onClick={onClose} className='text-gray-800 transition-colors'>
                <X className='w-5 h-5'/>
              </button>


              </div>

              <div className='p-6'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm mb-1' htmlFor="">Company *</label>
                  <input type="text"
                  className='w-full border border-gray-300 rounded-lg px-3 py-2' 
                  placeholder='Enter company name'
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  value={company}/>
                </div>

                <div>
                  <label htmlFor="" className='block text-sm mb-1'>Position *</label>
                  <input type="text" 
                  className='w-full border border-gray-300 rounded-xl px-3 py-2'
                  placeholder='Enter job position'
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  value={position}/>
                </div>

                <div>
                  <label htmlFor="" className='block text-sm mb-1'>Application Date *</label>
                  <input type="date"
                  className='w-full border border-gray-300 rounded-xl px-3 py-2'
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value) }
                  required
                   />
                </div>

                <div>
                  <label htmlFor="" className='block text-sm'>Status *</label>
                  <select name="" id="" value={status} 
                  className='w-full border border-gray-300 rounded-xl px-3 py-2'
                  onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value='Applied'>Applied</option>
                    <option value='Interviewing'>Interviewing</option>
                    <option value='Rejected'>Rejected</option>
                    <option value='Offered'>Offered</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="" className='block text-sm'>Note</label>
                  <textarea name="" id="" 
                  rows={3}
                  value={note}
                  onChange={(e)=> setNote(e.target.value)}
                  className='w-full border border-gray-300 rounded-xl px-3 py-2'
                  placeholder="Add any notes about this application..."></textarea>
                </div>
              </div> 

              <div className='flex justify-end space-x-3 pt-6 border-t mt-6'>
                <button type='button' onClick={onClose} className='px-4 py-3 border text-gray-700 rounded-lg'>Cancel</button>

                <button type='button' onClick={handleSubmit} className='px-4 py-3 border bg-gray-800 text-white rounded-lg'>
                  {buttonText}
                  </button>
              </div>

              </div>
              

        </div>

    </div>
  )
}

export default FormModal