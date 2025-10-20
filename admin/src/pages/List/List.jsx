import React from 'react'
import './List.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const List = () => {

  const [list,setList] = React.useState([]);

  React.useEffect(()=>{
    fetchList();
  },[])

  const fetchList = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/list`);
    // console.log(response.data);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error('Error fetching list')
    }
  }

  const removeFood = async (id)=>{
    // remove food item
    console.log("Remove food item with id:", id);
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/food/delete/${id}`);
    if(response.data.success){
      toast.success('Food item removed successfully');
      await fetchList();
    }else{
      toast.error('Error removing food item');
    }
  }


  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>

        {list.map((item,index)=>{
          return(
            <div className='list-table-format' key={index}>
              <img src={`${import.meta.env.VITE_API_URL}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
