import { useEffect, useState } from "react";
import { useShoppingLists } from '../hooks/useShoppingLists';
import { Card, CardContent } from "../components/ShoppingList/Card";
import { Button } from "../components/ShoppingList/Button";
import { Input } from "../components/ShoppingList/Input";
import { Checkbox } from "../components/ShoppingList/Checkbox";

export default function ShoppingList() {
  const { fetchShoppingLists, createShoppingList, updateShoppingList, deleteShoppingList } = useShoppingLists();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const loadShoppingLists = async () => {
      const lists = await fetchShoppingLists();
      setShoppingLists(lists);
    };
    loadShoppingLists();
  }, []);

  const addItem = (listId) => {
    if (newItem.trim()) {
      const updatedList = shoppingLists.map(list => {
        if (list._id === listId) {
          return {
            ...list,
            items: [...list.items, { name: newItem, quantity: "", checked: false }]
          };
        }
        return list;
      });
      setShoppingLists(updatedList);
      setNewItem("");
      // Update the shopping list in the backend
      updateShoppingList(listId, updatedList.find(list => list._id === listId));
    }
  };

  const toggleCheck = (listId, itemId) => {
    const updatedList = shoppingLists.map(list => {
      if (list._id === listId) {
        return {
          ...list,
          items: list.items.map(item => item._id === itemId ? { ...item, checked: !item.checked } : item)
        };
      }
      return list;
    });
    setShoppingLists(updatedList);
    // Update the shopping list in the backend
    updateShoppingList(listId, updatedList.find(list => list._id === listId));
  };

  const removeItem = async (listId, itemId) => {
    const updatedList = shoppingLists.map(list => {
      if (list._id === listId) {
        return {
          ...list,
          items: list.items.filter(item => item._id !== itemId)
        };
      }
      return list;
    });

    const listToUpdate = updatedList.find(list => list._id === listId);
    setShoppingLists(updatedList);
    // Update the shopping list in the backend
    await updateShoppingList(listId, listToUpdate);

    // Check if the list is empty after removing the item
    if (listToUpdate.items.length === 0) {
      await deleteShoppingList(listId); // Delete the shopping list if empty
      setShoppingLists(prev => prev.filter(list => list._id !== listId)); // Remove from state
    }
  };

  console.log('Selected Recipe:', selectedRecipe);

  return (
    <div className="shopping-list-page">
      <h2 className="shopping-list-title">Your Shopping Lists</h2>
      {shoppingLists.length === 0 ? (
        <p className="no-shopping-lists">You don't have any shopping lists.</p>
      ) : (
        shoppingLists.map(list => (
          <Card key={list._id} className="mb-4">
            <CardContent>
              <h3 className="text-lg font-semibold">{list.title}</h3>
              <div className="space-y-2">
                {list.items.map((item, index) => (
                  <div key={`${list._id}-${item.name}-${index}`} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center">
                      <Checkbox className="checkbox" checked={item.checked} onCheckedChange={() => toggleCheck(list._id, item._id)} />
                      <span className={`${item.checked ? "line-through text-gray-500" : ""}`}>
                        {item.name} {item.quantity} {item.unit}
                      </span>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => removeItem(list._id, item._id)}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Input placeholder="Add an item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                <Button onClick={() => addItem(list._id)}>Add</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
