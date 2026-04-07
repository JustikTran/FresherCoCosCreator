#### Account:
- id
- password
- role
- userId
- deletedAt
- isBanned
- createAt

#### User:
- id
- phone
- name
- avatar

#### Receive Address
- id
- userId
- address
- phone
- note
- isDefault
- isDeleted

#### category
- id
- name

#### Product
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

#### Product Option
- id
- size
- color
- price
- quantity
- image

#### Order
- id
- userId
- status
- totalAmount
- shippingFee
- paidAt
- createdAt
- updatedAt

#### Order Item
- id
- orderId
- productId
- optionId
- quantity
- price

#### Cart
- id
- userId

#### Cart Item
- id
- cartId
- productId
- optionId
- quantity

#### Rating
- id
- userId
- productId
- point
- comment

#### Revenue:
- date
- orderId
- amount
- type (SALE | REFUND)

#### Expense:
- id
- type (IMPORT_GOODS | SHIPPING | MARKETING | OTHER)
- amount
- note
- createdAt

#### ProductCost:
- productId
- optionId
- importPrice

#### Inventory(log)
- id
- productId
- optionId
- type
- quantity
- reason
- createAt