# Invoice Generator Application for COCCINELLE SARL

## Overview

This application is an invoice generator designed for COCCINELLE SARL, specifically tailored for international trade operations. It allows users to create, manage, and export professional invoices with features catering to international business needs.

## Technology Stack

- **Frontend Framework**: React with Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **PDF Generation**: react-to-pdf
- **Routing**: Next.js App Router
- **Build Tool**: Next.js built-in build system

## Features

1. **Invoice Creation**
   - Automatic generation of unique invoice numbers
   - Customer information management
   - Line item management (add, edit, remove products/services)
   - Automatic calculation of subtotals, fees, and total amounts
   - Inclusion of transport and customs charges
   - Fee percentage application

2. **Customer Management**
   - Add and select customers for invoices
   - Store customer details (name, address, phone number)

3. **Item Management**
   - Add items with details (description, quantity, price, weight)
   - Upload and display item images

4. **Invoice Customization**
   - Set delivery location and method
   - Add and edit general conditions for the invoice

5. **Invoice Preview**
   - View a formatted preview of the invoice before finalizing

6. **Export Functionality**
   - Generate and download invoices as PDF files

7. **Data Persistence**
   - Save created invoices for later use
   - Load and edit previously saved invoices

8. **Multilingual Support**
   - Interface primarily in French, with potential for expansion to other languages

## Database Solution

We recommend using LocalForage for client-side data storage. It provides a simple, Promise-based API and automatically uses the best available storage method (IndexedDB, WebSQL, or localStorage).

Implementation steps:

1. Install LocalForage:
   ```
   npm install localforage
   ```

2. Initialize LocalForage in your app:
   ```typescript
   import localforage from 'localforage';

   localforage.config({
     name: 'InvoiceGeneratorApp',
     storeName: 'invoices',
   });
   ```

3. Use LocalForage methods for data operations:
   ```typescript
   // Saving an invoice
   await localforage.setItem(invoiceId, invoiceData);

   // Loading invoices
   const invoices = await localforage.getItem('allInvoices');

   // Deleting an invoice
   await localforage.removeItem(invoiceId);
   ```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── InvoiceForm.tsx
│   │   ├── CustomerForm.tsx
│   │   ├── ItemList.tsx
│   │   ├── InvoicePreview.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── invoices/
│   │   │   ├── [id].tsx
│   │   │   └── new.tsx
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── invoiceCalculations.ts
│   │   ├── pdfGenerator.ts
│   │   └── ...
│   ├── hooks/
│   │   ├── useInvoice.ts
│   │   └── useCustomer.ts
│   └── types/
│       ├── invoice.ts
│       └── customer.ts
├── public/
│   └── ...
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## Setup and Running the Application

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

To create a production build:

```
npm run build
```

Then, to start the production server:

```
npm start
```

## Future Enhancements

1. User Authentication: Implement user accounts for personalized invoice management
2. Cloud Synchronization: Sync invoices across devices using a backend service
3. Multiple Languages: Expand language support beyond French
4. Advanced Reporting: Generate financial reports based on invoice data
5. Integration with Accounting Software: Allow export of data to popular accounting tools

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.