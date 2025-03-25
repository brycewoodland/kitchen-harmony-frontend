import { useState } from "react";
import { Card, CardContent } from "../components/ShoppingList/Card";
import { Button } from "../components/ShoppingList/Button";
import { Input } from "../components/ShoppingList/Input";
import { Checkbox } from "../components/ShoppingList/Checkbox";
// import { Trash } from "../components/ShoppingList/Trash";

export default function ShoppingList() {
  const [items, setItems] = useState([
    { id: 1, name: "Flour", quantity: "2 cups", checked: false },
    { id: 2, name: "Eggs", quantity: "3", checked: false },
    { id: 3, name: "Milk", quantity: "1 cup", checked: false },
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), name: newItem, quantity: "", checked: false }]);
      setNewItem("");
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleCheck = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <Card className="p-4 w-full max-w-md mx-auto mt-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Shopping List</h2>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center gap-2">
                <Checkbox checked={item.checked} onCheckedChange={() => toggleCheck(item.id)} />
                <span className={`${item.checked ? "line-through text-gray-500" : ""}`}>{item.name} {item.quantity}</span>
              </div>
              <Button size="icon" variant="ghost" onClick={() => removeItem(item.id)}>
                {/* <Trash className="w-4 h-4 text-red-500" /> */}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Input placeholder="Add an item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          <Button onClick={addItem}>Add</Button>
        </div>
      </CardContent>
    </Card>
  );
}
