# ⚛️ Resolvr - React Ticket Management App

A modern ticket management application built with React and Vite, implementing authentication, dashboard, and CRUD functionality with a clean, responsive interface.

## 🔗 Other Versions

This project is available in multiple frameworks:

- **⚛️ React Version** (You are here) - [Live Demo](https://truella.github.io/Resolvr_React_Version_/)
- **🟢 Vue Version** - [Repository](https://github.com/Truella/Resolvr_Vue_Version) | [Live Demo](https://truella.github.io/Resolvr_Vue_Version/#/)
- **🐘 PHP Twig Version** - [Repository](https://github.com/yourusername/resolvr_Twig_Version) | [Live Demo](https://resolvrtwigversion-production.up.railway.app/dashboard)


## ⚙️ Setup and Run

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/resolvr-react.git
cd resolvr-react

# Install dependencies
npm install

# Run development server
npm run dev
```

Open in your browser: `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```


## 🔐 Authentication

- **LocalStorage-based** authentication with `ticketapp_session` key
- Simulated login/signup with client-side validation
- Protected routes with route guards
- Unauthorized access redirects to `/login`
- Logout clears session and redirects to landing page



## 📋 Features

### Authentication
- ✅ User registration with validation
- ✅ Email and password validation
- ✅ Password confirmation matching
- ✅ Duplicate email prevention
- ✅ Session persistence
- ✅ Secure logout

### Dashboard
- ✅ Ticket statistics overview
- ✅ Quick action buttons
- ✅ Recent tickets summary
- ✅ User profile display
- ✅ Protected route (login required)

### Ticket Management
- ✅ Create new tickets with form
- ✅ View all user tickets
- ✅ Update ticket status (Open/In Progress/Closed)
- ✅ Delete tickets with confirmation
- ✅ Real-time UI updates
- ✅ Toast notifications for actions



## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "lucide-react": "^0.263.1",
  "react-toastify": "^9.1.3"
}
```


MIT License - Free to use for educational and commercial purposes


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
