# Cairo

**Overview**

Cairo is a fast, hassle-free ordering system that lets you browse menus, place orders, and manage your deliveries  with just a few taps.

---

**Features**

- **Restaurant Selection**: Users can choose from a list of available restaurants.
- **Order Type**: Select between "Dine-in" or "Takeaway" to suit your dining preference.
- **Categorized Menu**: Browse food items organized by categories for easy navigation.
- **Shopping Cart**: A persistent, context-based cart to add and manage your selected items.
- **Secure Checkout**: Integrated with Stripe for a secure and reliable payment process.
- **Order Tracking**: Users can track the status of their orders using their CPF.
- **Responsive Design**: A mobile-first interface that provides a great experience on any device.

---

**Stack & Structure**

- **Framework**: Next.js (App Router, Server Actions)
- **Styling**: TailwindCSS with `tailwindcss-animate` for UI animations.
- **UI Components**: Built with Radix UI for accessible and unstyled primitives, and `lucide-react` for icons.
- **Database & ORM**: PostgreSQL with Prisma for type-safe database access.
- **Forms & Validation**: `react-hook-form` and `zod` for robust form management.
- **Payments**: Stripe handles all payment processing.
- **Language**: TypeScript.

---

**Run**

After cloning the repo:

1.  **Install dependencies:**

```bash
npm install
```

2.  **Set up environment variables:**

Create a `.env` file in the root of the project and add the following variables:

```env
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
```

3.  **Run the database migrations:**

```bash
npx prisma migrate dev
```

4.  **Seed the database (optional):**

To populate the database with initial data:

```bash
npx prisma db seed
```

5.  **Start the development server:**

```bash
npm run dev
```

6.  **Build for production:**

```bash
npm run build
```

---

**Roadmap**

Here is a roadmap of features planned for future versions of Cairo:

- **Search & Filtering**: Implement a search to find restaurants and specific food items, and add filtering options (e.g., by price, category).
- **User Accounts**: Allow users to create accounts to save their order history, delivery addresses, and payment methods.
- **Real-time Order Updates**: Use WebSockets to provide real-time updates on order status.
- **Restaurant Reviews**: Enable users to rate and review restaurants and food items.
- **Admin Dashboard**: Enhance the admin capabilities for managing restaurants, menus, and orders.
- **Advanced Recommendations**: Introduce a recommendation system based on user preferences and order history.
- **Promotions & Discounts**: Add a system for creating and applying promotional codes.
