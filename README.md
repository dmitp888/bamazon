# Bamazon

This is an  Amazon-like storefront  based on MySQL and Node.js. The app  takes in orders from customers and deplete stock from the store's inventory. There is also a manager mode `bamazonManager.js`. 

Running `bamazonCustomer.js` application will first display all of the items available for sale. This includes the ids, names, and prices of products for sale. The app  then prompts users with two messages.

   * The first  asks them the ID of the product they would like to buy.
   * The second message  asks how many units of the product they would like to buy.

Once the customer has placed the order, the application  checks if the store has enough of the product to meet the customer's request. If not, the app  logs a phrase  `Insufficient quantity!`, and then prevents the order from going through. However, if the store _does_ have enough of the product,   the customer's order is fulfilled. This means updating the SQL database to reflect the remaining quantity. Once the update goes through,  the customer can see the total cost of their purchase.
    
## Manager Mode Features

Running manager mode application will:
 ```
    * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
 ```
  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.


## Download   'Bamazon-video.mov' file to watch a demo video 
https://github.com/dmitp888/liri-node-app/blob/master/Liri-video.mov
