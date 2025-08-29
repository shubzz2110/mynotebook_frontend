# 📝 MyNotebook Frontend

This is the **frontend** of the MyNotebook project, built with **Next.js 14 (App Router)** and **TypeScript**.  
It provides a clean, responsive, and modern UI to interact with the MyNotebook backend API (Django + DRF).

---

## 🚀 Features
- Next.js 14 with App Router
- TypeScript for type safety
- TailwindCSS for styling
- Authentication with JWT (via backend API)
- Notes management (create, update, delete, search, filter, pin, favorite)
- Pagination & sorting
- Responsive UI

---

## 📦 Tech Stack
- **Next.js 14**
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Axios** (API calls)
- **Lucide-react** (icons)
- **Framer Motion** (animations)
- **Moment.js** (date formatting)

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/mynotebook_frontend.git
cd mynotebook_frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
Create a `.env.local` file in the root directory and configure the backend API URL:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### 4️⃣ Run the development server
```bash
npm run dev
```
The app will be available at 👉 [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

- `npm run dev` → Start development server  
- `npm run build` → Build production app  
- `npm start` → Run production build  
- `npm run lint` → Run linter  

---

## 🛠️ Folder Structure
```
mynotebook_frontend/
│── app/              # Next.js app directory (App Router)
│── components/       # Reusable UI components
│── lib/              # API and helper functions
│── public/           # Static assets
│── styles/           # Global styles
│── package.json      # Project dependencies
│── tsconfig.json     # TypeScript config
│── .env.local        # Environment variables
```

---

## 🧪 Testing (optional)
If you’re using Jest or Playwright (optional):
```bash
npm run test
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub.  
2. Import the repository in [Vercel](https://vercel.com/).  
3. Add your `.env.local` variables in Vercel dashboard.  
4. Deploy 🚀  

### Docker (Optional)
```bash
docker build -t mynotebook-frontend .
docker run -p 3000:3000 mynotebook-frontend
```

---

## 🤝 Contributing
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to the branch (`git push origin feature/my-feature`)  
5. Open a Pull Request  

---

## 📄 License
This project is licensed under the **MIT License**.

---

### 👨‍💻 Author
Developed by **Your Name**  
GitHub: [yourusername](https://github.com/yourusername)

