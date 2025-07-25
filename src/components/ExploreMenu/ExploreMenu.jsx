import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
return (
    <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p>Choose from a diverse menu featuring a delectable array of dishes.
            From savory classics to innovative creations, there's something for every palate.
            Discover new flavors and enjoy your favorites, all in one place.</p>
            <div className="explore-menu-list">
                    {
                            menu_list.map((item)=>{
                                    return (
                                            <div onClick={()=>{
                                                if(item.menu_name !== category){
                                                    setCategory(item.menu_name)
                                                }else if(item.menu_name === category){
                                                    setCategory("All")
                                                }
                                            }} key={item.index} className="explore-menu-list-item">
                                                    <img  className={item.menu_name===category ? "active" : ""} src={item.menu_image} alt="" />
                                                    <p>{item.menu_name}</p>
                                            </div>
                                    )
                            })
                    }
            </div>
            <hr/>
    </div>
)
}

export default ExploreMenu
