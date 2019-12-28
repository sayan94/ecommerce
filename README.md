
**Ecommerce App** 

Instruction to deploy : 
1. Go into the 'ecommerce app' folder and run 'npm install' in the Terminal
2. Then run the command : 'node app.js'

**APIs**

1. GET '/list' – Returns list of “purchasable” items
  
This API returns all the purchasable items if no 'search' and 'filters' are passed in the query string

Instruction to test in POSTMAN : 

GET request : http://localhost:4000/list 

Response Example:

`{
     "purchasableList": [
         {
             "id": "5e031cbde7179a2f01071557",
             "price": 10000,
             "discountedPrice": 9000,
             "name": "USB Cable",
             "images": [],
             "description": "cable",
             "type": "product"
         },
         {
             "id": "5e060fdce7179a2f01079e7a",
             "price": 10000,
             "discountedPrice": 9000,
             "name": "iPhoneX 32GB Silver",
             "images": [],
             "description": "Smart Phone",
             "productId": "5e031c8de7179a2f01071555",
             "type": "productVariant"
         }   
     ]
 }`
 
 To Search and Filter :
 
 GET request : http://localhost:4000/list?search=x&filters[0]=32gb&filters[1]=gold
 
 API should return all the purchasable items with name containing 'x'(in this example) and options containing '32gb and gold'
 
 
 
 2. GET /details/:id - Returns the product details for a given purchasable id

 API Parameters:
 id: mandatory path param, The ID of the purchasable item whose details are expected in response
 
 Response example : 
 
 `{
      "product": {
          "images": [],
          "_id": "5e031c8de7179a2f01071555",
          "id": "prod1577259831517",
          "name": "iPhone X",
          "description": "Smart Phone",
          "price": 10000,
          "discountedPrice": 9000,
          "attributes": {
              "storage": [
                  "32GB",
                  "64GB"
              ],
              "color": [
                  "silver",
                  "gold"
              ]
          },
          "isPurchasable": false,
          "isDeleted": false
      },
      "variantList": [
          {
              "images": [],
              "_id": "5e060fdce7179a2f01079e7a",
              "productId": "5e031c8de7179a2f01071555",
              "productName": "iPhoneX",
              "variantName": "32GB Silver",
              "description": "Smart Phone",
              "price": 10000,
              "discountedPrice": 9000,
              "isDeleted": false,
              "isPurchasable": true
          },
          {
              "images": [],
              "_id": "5e06f4a9e7179a2f0107cbbc",
              "productId": "5e031c8de7179a2f01071555",
              "productName": "iPhoneX",
              "variantName": "64GB Silver",
              "description": "Smart Phone",
              "price": 10000,
              "discountedPrice": 9000,
              "isDeleted": false,
              "isPurchasable": true
          },
          {
              "images": [],
              "_id": "5e06f5a3e7179a2f0107cbc1",
              "productId": "5e031c8de7179a2f01071555",
              "productName": "iPhoneX",
              "variantName": "32GB Gold",
              "description": "Smart Phone",
              "price": 10000,
              "discountedPrice": 9000,
              "isDeleted": false,
              "isPurchasable": true
          },
          {
              "images": [],
              "_id": "5e06f5bce7179a2f0107cbc3",
              "productId": "5e031c8de7179a2f01071555",
              "productName": "iPhoneX",
              "variantName": "64GB Gold",
              "description": "Smart Phone",
              "price": 10000,
              "discountedPrice": 9000,
              "isDeleted": false,
              "isPurchasable": true
          }
      ]
  }`

 Data base files are presentinside DB folder