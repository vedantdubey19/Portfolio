# Portfolio Website

A modern, interactive personal portfolio website showcasing projects, skills, and experience in AI/ML, software development, and full-stack engineering.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Animations**: Smooth animations using Framer Motion
- **Dynamic Components**: Custom cursor, liquid trail effects, and animated backgrounds
- **Contact Form**: Backend integration for sending messages
- **Skills Visualization**: Tag cloud for technical skills
- **Project Showcase**: Detailed project cards with descriptions
- **Experience Timeline**: Interactive timeline of professional experience
- **Certifications**: Display of relevant certifications

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **TagCloud** - 3D tag cloud visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedantdubey19/Portfolio.git
   cd vedant-portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## 🚀 Usage

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## 📁 Project Structure

```
vedant-portfolio/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and media files
│   ├── components/        # React components
│   │   ├── About.jsx      # About section
│   │   ├── Contact.jsx    # Contact form
│   │   ├── Experience.jsx # Experience timeline
│   │   ├── Hero.jsx       # Hero section
│   │   ├── Projects.jsx   # Projects showcase
│   │   ├── Skills.jsx     # Skills section
│   │   └── ...            # Other components
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── backend/
│   ├── models/            # Database models
│   ├── server.js          # Express server
│   └── package.json
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Vedant Dubey - [Your Email] - [LinkedIn Profile]

Project Link: [https://github.com/vedantdubey19/Portfolio](https://github.com/vedantdubey19/Portfolio)
