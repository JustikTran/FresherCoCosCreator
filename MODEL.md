#### 1. Account:
- id
- password
- role
- userId
- isBanned
- createAt

#### 2. User:
- id
- phone
- name
- avatar
- deletedAt

#### 3. Receive Address
- id
- userId
- address
- phone
- note
- isDefault
- deletedAt

#### 4. Category
- id
- name

#### 5. Product
- id
- name
- thumbnail
- price
- description
- brand
- isOutStock
- deletedAt
- createAt

#### 6. Product Option
- id
- productId
- size
- color
- price
- quantity
- image
- deletedAt

#### 7. Order
- id
- userId
- status
- totalAmount
- shippingFee
- paidAt
- createdAt
- updatedAt

#### 8. Order Item
- id
- orderId
- productId
- optionId
- quantity
- price

#### 9. Cart
- id
- userId

#### 10. Cart Item
- id
- cartId
- productId
- optionId
- quantity

#### 11. Rating
- id
- userId
- productId
- optionId
- point
- comment

#### 12. Revenue:
- date
- orderId
- amount
- productId
- optionId

#### 13. Expense:
- id
- type (IMPORT_GOODS | SHIPPING | MARKETING | OTHER)
- amount
- note
- createdAt

#### 14. Product Cost:
- productId
- optionId
- importPrice
- importDate

#### 15. Inventory (log)
- id
- productId
- optionId
- type
- quantity
- reason
- createAt