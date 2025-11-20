# 🧾 Purchase Order Form – ReactJS Assessment  
A fully functional, component-based **Purchase Order (PO) Management Form** built in **React.js**, designed as per the interview task requirements.  
This project includes clean UI, modular code structure, complete validation rules, and dynamic talent selection features.

---

## 🚀 Features

### ✅ Purchase Order Details
- Client selection (mandatory)
- PO Type: **Group PO / Individual PO**
- PO Number (alphanumeric)
- Received From (Name + Email)
- Received On (date)
- PO Start & End Dates  
- Budget with max 5 digits  
- Currency selection  
- Auto-validation on submit

---

## 👥 Talent Detail  
Each selected client loads REQ(s) and associated talents dynamically.

### Talent rules implemented:

#### ✔ 1. Load talents based on selected REQ  
- When you pick a REQ Name, all associated talents appear.

#### ✔ 2. Checkbox → Opens talent fields  
- Only selected talents show fields for  
  - Contract Duration  
  - Bill Rate  
  - Standard Time BR  
  - Over Time BR  
  - Currency sets  
  - Textbox + suffix design (`Months`, `/hr`)

#### ✔ 3. Individual PO  
- **Only ONE** talent can be selected across all REQs.

#### ✔ 4. Group PO  
- Requires **minimum 2 talents** selected before submitting.

#### ✔ 5. Add/Remove REQ Sections  
- Add Another (Group PO only)  
- Delete REQ sections dynamically

---

## 🛠 Technologies Used
- **React.js (Hooks + Functional Components)**
- **Pure CSS** (no UI libraries)
- **React-Icons**
- Fully modular component architecture  
- Clean separation of UI / logic / data

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/KrutikNaina/ownai-reactjs.git
cd ownai-reactjs
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Start the development server
```sh
npm start
```

## 🚀 App Runs At
👉 **http://localhost:3000**

---

## ✔ Validations Implemented

### **Form Level**
- Mandatory fields  
- 5-digit numeric budget  
- End Date must be **greater than or equal to** Start Date  
- Email format  
- PO Type required  
- Client selection required  

---

### **Talent Level**
- Contract Duration required  
- Bill Rate required  
- Talent fields appear **only when checkbox is selected**  

---

### **Business Rules**
- **Individual PO → only 1 talent allowed (globally)**  
- **Group PO → at least 2 talents required before submitting**  

---

## 📷 UI Preview

**Pixel-perfect design based on provided Screenshot/Figma**, including:

- 4-column responsive layout  
- Soft light grey bordered cards  
- Input suffix boxes (`Months`, `/hr`)  
- Clean spacing & uniform paddings  
- Shadowed sections  
- Realistic PO management form layout  

---

## 📝 Code Quality

- Fully modular **component-based architecture**  
- Clean and consistent state management (React Hooks)  
- Components split into logical units:
  - `PurchaseOrderForm`
  - `ReqSection`
  - `TalentFields`
- Reusable field layouts  
- Zero redundant or unused code  
- Interview-friendly formatting  
- Follows React best practices (pure components, controlled inputs, prop drilling kept minimal)  

---

## 📤 Submission Output

This project includes:

- **Edit Mode**  
- **View-Only Mode** after Save  
- JSON payload preview  
- Clean console output on Submit  

---

## 🤝 Contribution
This project was created as part of a **ReactJS interview assessment**.  
Feel free to **fork**, improve, or extend functionality.

---

## 🧑‍💻 Author  
**Krutik Nena**  

🌐 Portfolio: https://krutiknaina.com  
🐙 GitHub: https://github.com/KrutikNaina  


