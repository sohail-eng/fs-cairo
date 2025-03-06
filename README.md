###### Donuts
#### Description

#### Structure

- **Backend**: 
  - Database (Prisma PostgreSQL):
    - **Restaurant**: Restaurant's Info;
    - **Category**: The products are in diferrent Categories;
    - **Product**: Individual menu items;
    - **Order**: Stores order Details;
    - **OrderProduct**: Links products to orders;
    - Enums:
      - **OrderStatus**: Tracks the order's status;
      - **OrderType**: Dine-in or Takeaway.

- **Frontend**:
  - **Next.js**

#### Flow:

0. **Initial Page**
1. **Restaurant Page**:
    - Displays restaurant information and User selects an Order Type (Dine-In or Takeaway)
2. **Menu Page**
2.5. **Cart**:
    - Context between pages
3. **Product Page**:
    - Product info
4. **Payment**