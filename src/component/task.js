import React, {useState , useEffect} from 'react'
import "./style.css"

// get the local storage data
const getlocalData = ()=>{
  const lists = localStorage.getItem("mytodolist")
  if(lists){
    return JSON.parse(lists)
  }
  else{
    return [];
  }
}
const Task = () => {
  const [inputData , setInputdata] = useState(" ");
  const [items , setItems] = useState(getlocalData()) ;
  const [iseditItem , setiseditItem] = useState("")
  const [toggleButton , settoggleButton] = useState(false);

  // add items function
  const addItem=()=>{
    if(!inputData){
      alert("please fii data")
    }
    else if(inputData && toggleButton){
      setItems(
        items.map((curElem)=>{
             if(curElem.id === iseditItem) { 
              return {...curElem ,name:inputData}
            }
            return curElem ;
        })
      )
    setInputdata([]);
    setiseditItem(null)
    settoggleButton(false);
    }
    else{
      const newInputDta ={
        id: new Date().getTime().toString(),
        name : inputData,
      }
      setItems([...items , newInputDta])
      setInputdata(" ");
    }
  }

  //edit items
  const editItem = (index)=>{
    const item_todo_edited = items.find((curElem)=>{
      return curElem.id ===index
    })
    setInputdata(item_todo_edited.name);
    setiseditItem(index)
    settoggleButton(true);
  }

  // delete items
  const deleteItem = (index)=>{
    const updatedItem = items.filter((curElem)=>{
      return curElem.id !== index ;
    })
    setItems(updatedItem) ;
  }

  // remove all
  const removeAll =()=>{
    setItems([]) ;
  }

  // adding local storage
  useEffect(() => {
    localStorage.setItem("mytodolist" , JSON.stringify(items));
  }, [items])

  return (
    <>

      <div className="main-div">
               <div className="child-div">
                <figure>
                    <img src="" alt="todologo" />
                    <figcaption>Add your List here </figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='✍ Add Items' className='form-control' value={inputData } onChange={(event)=>setInputdata(event.target.value)}/>
                    {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>)
                    : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                    }
                    
                </div>
                {/* show our items */}
                 
                 <div className="showItems">

                  {items.map((curElem)=>{
                    return(
                    <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                    </div>
                  </div>
                  )
                  })}
                  
                 </div>



                {/* remove all buttons */}
                <div className="showItems">
                  <button className="btn effect04" data-sm-link-text="RemoveAll" onClick={removeAll}><span>CheckList</span></button>
                </div>
               </div>
      </div>
    </>
  )
}

export default Task
