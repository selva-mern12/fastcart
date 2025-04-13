# 🚀 FastCart - Responsive Admin Dashboard

FastCart is a fully responsive admin dashboard tailored for managing e-commerce categories efficiently. Built using the MERN stack, it features secure JWT-based authentication and robust category management including **add**, **edit**, **delete**, and **search** functionalities.

---

## 🛠 Tech Stack

### 🔹 Frontend
- React.js (v19.1.0)
- React Router DOM (v7.5.0)
- Axios (v1.8.4)
- React Icons (v5.5.0)
- js-cookie (v3.0.5)

### 🔹 Backend
- Node.js
- Express.js (v5.1.0)
- MongoDB with Mongoose (v8.13.2)
- JWT (jsonwebtoken v9.0.2)
- BcryptJS (v3.0.2)
- Cloudinary (v1.41.3)
- Multer + multer-storage-cloudinary
- CORS
- dotenv

---

## ✨ Features

- 🔐 Secure JWT-based Authentication and Authorization
- 📁 Category Management: Add, Edit, Delete, Search
- 📱 Fully Responsive Design

---

## 📁 Project Structure

```
fastcart
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── AuthPage
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── Categories
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── Header
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── MainPage
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── Menu
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── ProtectedRoute
│   │   │   └── index.js
│   │   └── UnsuccessfulPages
│   │       ├── index.js
│   │       └── index.css
│   ├── App.js / App.css
└── package.json

fastcart_server
├── .gitignore
├── index.js
└── package.json
```

---

## 🚀 How to Run Locally

### 🔧 Prerequisites
- Node.js and npm installed
- MongoDB running locally or cloud URI

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/selva-mern12/fastcart.git
```

### 2️⃣ Backend Setup
```bash
git clone https://github.com/selva-mern12/fastcart_server.git
cd fastcart_server
npm install
```

Create a `.env` file:
```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:
```bash
# Start backend server
npm run dev  # or use `nodemon index.js` manually if script not defined

```

### 3️⃣ Frontend Setup
```bash
cd ../fastcart
npm install
npm start
```

App will run at: `http://localhost:3000`

---

## 📸 Screenshots

### 💻 Large Device Screenshots

![Registration Page](../fastcart_ui/src/assets/lg_s_shots/registration.png)
![Login Page](../fastcart_ui/src/assets/lg_s_shots/login.png)
![Category Page](../fastcart_ui/src/assets/lg_s_shots/categorypage_with_crud.png)
![Category Page](../fastcart_ui/src/assets/lg_s_shots/categorypage_with_balance_menu_update.png)
![Loading View](../fastcart_ui/src/assets/lg_s_shots/loading.png)
![Add Edit Page](../fastcart_ui/src/assets/lg_s_shots/add_edit_categories.png)

---

### 📱 Small Device Screenshots

![Registration Mobile](../fastcart_ui/src/assets/sm_s_shots/registration_mobile.jpg)
![Login Mobile](../fastcart_ui/src/assets/sm_s_shots/login_mobile.jpg)
![Category Page](../fastcart_ui/src/assets/sm_s_shots/categories_mobile_page.jpg)
![Menu List](../fastcart_ui/src/assets/sm_s_shots/menu_list.jpg)
![Add Edit Page](../fastcart_ui/src/assets/sm_s_shots/add_edit_category_mobile.jpg)


---

## 🤝 Contribution

Feel free to fork the project and raise PRs. Contributions are welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Created with ❤️ by [Selva](https://github.com/selva-mern12)
