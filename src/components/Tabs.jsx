import Todos from "./Todos"
import { useState } from "react";

const Tabs = (props) => {

  const handleAll = () => {
   props.handleAll()
  }
  
  const handleCompleted = () => {
    props.handleCompleted()
    
  }
  
  const handleUncompleted = () => {
   props.handleUncompleted()
  }
  
    return (
        <div className="tabs">
            <button className="tab" onClick={handleAll}>All</button>
            <button className="tab" onClick={handleCompleted}>Completed</button>
            <button className="tab" onClick={handleUncompleted}>Uncompleted</button>
        </div>
    )
}

export default Tabs;