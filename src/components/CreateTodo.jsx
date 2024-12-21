import { useState } from "react";
function CreateTodo({ addTodo }) {
   const [newItem, setNewItem] = useState("");

   function handleSubmit(e) {
      e.preventDefault();
      addTodo(newItem);
      setNewItem("");
   }

   return (
      <form onSubmit={handleSubmit} className="items-new">
         <div className="form-row">
            <label htmlFor="item">New Item</label>
            <input
               type="text"
               id="item"
               value={newItem}
               onChange={(e) => setNewItem(e.target.value)}
            />
         </div>
         <button className="btn">Add Item</button>
      </form>
   );
}

export default CreateTodo;
