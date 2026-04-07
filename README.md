# CLOTHES STORE MANAGEMENT

An application allow customer can buy product from the clothes store.

## 1. Problem statement:
In the era of booming online shopping, stores that want to keep up must use a website or third-party platform to sell their products. This makes them dependent on websites or social media.
## 2. Project object:



## 3. Scope:
<b>Guest/ customer</b>: Authentication, browse categories, search/filter, cart, payment, track order, rate.

<b>Staff</b>: product management, order management, inventory management

<b>Shop owner</b>: staff management, manage product cost, view report profit (with month, year)

## 4. Actor:
- `Guest`: who visit into app and view product but do not authentication or buy product.
- `Customer`: who access to app and authentication, they have needs to buy products.
- `Staff`: who access to app and authentication, they manage product and order in shop, and create inventory log.
- `Owner`: Shop owner, they can manage shop's staff, product, profit, product import cost.

## 5. Main features:
- Order management.
- Search and filter product.
- Purchase management.
- Accounting Report
    
    - Daily report:
    
        - Total orders
        - Revenue
        - Profit
    
    - Monthly:
        
        - Growth %
        - Top products

## 6. Model

Model design for object in app [here](MODEL.md).

## 7. Advance features (optional):
### 7.1. Promotion system:

Discount order amount for customer, Customer Appreciation Program, etc. 

#### Model
Coupon:
- code
- discountType (PERCENT | FIXED)
- value
- expiredAt

### 7.2. Notification
- Order status update
- Promotion

### 7.3 Search full-text

## 8. Tech
- Backend:
- Frontend: