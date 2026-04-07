#### 1. Account:
- id
- password
- role
- userId
- deletedAt
- isBanned
- createAt

#### 2. User:
- id
- phone
- name
- avatar

#### 3. Receive Address
- id
- userId
- address
- phone
- note
- isDefault
- isDeleted

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
- productOption[]
- categoryIds[]
- createAt

#### 6. Product Option
- id
- size
- color
- price
- quantity
- image

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
- point
- comment

#### 12. Revenue:
- date
- orderId
- amount
- type (SALE | REFUND)

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

#### 15. Inventory (log)
- id
- productId
- optionId
- type
- quantity
- reason
- createAt