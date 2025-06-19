### ordering system

a minimal, modern food ordering system.  
built with next.js, tailwindcss, radix-ui, prisma, stripe & more.

---

### stack

- next.js (app router, server actions)  
- tailwindcss (utility-first styling)  
- radix-ui (accessible ui primitives)  
- react-hook-form + zod (forms & validation)  
- prisma (orm for postgresql)  
- stripe (payments)  
- typescript  

---

### features

- select restaurant & order type (dine-in / takeaway)  
- browse categorized menu  
- add to cart (context-based)  
- view & edit cart  
- stripe checkout  
- order tracking via cpf  
- responsive, mobile-first ui  

---

### env

```env
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET_KEY=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...