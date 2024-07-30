/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/Options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import toast from 'react-hot-toast';

function CreateTrip() {

  const [place, setplace] = useState();

  // sara data is use from usestate mai store krenge
  const [formData, setformData] = useState([])
  const handleInputChange=(name,value)=>{
    const updatedValue = name === 'noOfdays' ? Number(value) : value;
    setformData({...formData,
      [name]:value
    })
  } 

  const OnGenerateTrip = async () => {
    // Debugging statement to verify formData
    if(formData?.nOofdays>10 && !formData?.location || !formData?.budget || !formData?.traveler){
      toast.error('Please fill all the fields to generate trip');
      return ;
    }
    else {
      //hamne yaha par apna final prompt bana liya hai dummy promptt par replace krke actual data ko
      const Final_Prompt=AI_PROMPT
      .replace('{location}',formData?.location)
      .replace('{totalDays}',formData?.nOofdays)
      .replace('{traveler}',formData?.traveler)
      .replace('{budget}',formData?.budget)
      .replace('{totalDays}',formData?.nOofdays)

      console.log(Final_Prompt);
      //now we will pass this prompt to our api

      const result=await chatSession.sendMessage(Final_Prompt);

      console.log(result?.response?.text());
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Share Your Travel Preferences and Let Us Curate Your Perfect Journey! 🌴🏕️</h2>
      <p className='mt-3  text-gray-900 text-xl'>Simply provide some basic details, and our trip planner will craft a personalized itinerary tailored to your preferences</p>
      
      {/* we will use here auto complete feature of react library */}
      {/* react-google-places-autocomplete */}
      <div className='mt-20 flex flex-col gap-10'>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of your choice✈️ ?</h2>
          <Input placeholder={'Ex. Mumbai,India'} type='text' onChange={(v)=>{setplace(v);handleInputChange('location',v.target.value)}} />
        </div>


        <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip⌛ ?</h2>
        <Input placeholder={'Ex. 2'} type='number' 
        onChange={(e)=>handleInputChange('nOofdays',e.target.value)}/>
        </div>


       <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget💷 ?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {/* we will use map to list our Budget Options */}
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} 
            onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
            ${formData?.budget==item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-400'>{item.desc}</h2>
            </div>
          ))}
        </div>


      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {/* we will use map to list our  Traveler Info */}
          {SelectTravelesList.map((item,index)=>(
            <div key={index} 
            onClick={()=>handleInputChange('traveler',item.people)}
            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData?.traveler==item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-400'>{item.desc}</h2>
            </div>
          ))}
        </div>  
        </div>
      </div>
    </div>


    <div className='my-10 justify-end flex'>
    <Button onClick={OnGenerateTrip}>Generate Trip</Button>
    </div>
  </div>
  )
}

export default CreateTrip