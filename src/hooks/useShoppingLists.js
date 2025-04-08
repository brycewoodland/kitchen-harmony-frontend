import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const API_URL = 'https://kitchen-harmony-backend.onrender.com/shoppingLists';

export const useShoppingLists = () => {
    const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

    const fetchShoppingLists = async () => {
        if (!isAuthenticated) return [];
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching shopping lists:", error);
            return [];
        }
    };

    const createShoppingList = async (listName, items = []) => {
        if (!isAuthenticated) throw new Error("User is not authenticated");
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.post(API_URL, {
                title: listName,
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    unit: item.unit
                })),
                userId: user?.sub
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating shopping list:", error);
            throw error;
        }
    };

    const updateShoppingList = async (shoppingListId, updateData) => {
        if (!isAuthenticated) throw new Error("User is not authenticated");
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.put(`${API_URL}/${shoppingListId}`, updateData, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        } catch (error) {
            console.error("Error updating shopping list:", error);
            throw error;
        }
    };

    const removeItemFromShoppingList = async (shoppingListId, itemId) => {
        return updateShoppingList(shoppingListId, { $pull: { items: { _id: itemId } } });
    };

    const toggleItemChecked = async (shoppingListId, itemId, checked) => {
        return updateShoppingList(shoppingListId, { $set: { "items.$[elem].checked": checked } }, {
            arrayFilters: [{ "elem._id": itemId }]
        });
    };

    const deleteShoppingList = async (shoppingListId) => {
        if (!isAuthenticated) throw new Error("User is not authenticated");
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.delete(`${API_URL}/${shoppingListId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
        } catch (error) {
            console.error("Error deleting shopping list:", error);
            throw error;
        }
    };

    return {
        fetchShoppingLists,
        createShoppingList,
        updateShoppingList,
        removeItemFromShoppingList,
        toggleItemChecked,
        deleteShoppingList
    };
};