# 🚀 Finance Tracker - Auto-Launch Guide

## 🎯 Quick Start Options

### **Option 1: One-Click Launch (Recommended)**

#### **For Mac/Linux:**
```bash
./start-finance-tracker.sh
```

#### **For Windows:**
```cmd
start-finance-tracker.bat
```

### **Option 2: Manual Launch**
```bash
npm install
npm run dev
```

### **Option 3: Standalone Demo**
Open `Finance-Tracker-Standalone.html` directly in your browser

## 📋 What the Auto-Launcher Does

The auto-launcher scripts will:

✅ **Check if Node.js and npm are installed**  
✅ **Verify you're in the correct directory**  
✅ **Install dependencies automatically** (if needed)  
✅ **Check for Supabase configuration**  
✅ **Start the development server**  
✅ **Open the application in your browser**  

## 🛠️ Setup Instructions

### **Step 1: Install Node.js**
- Visit [nodejs.org](https://nodejs.org/)
- Download and install the LTS version
- Verify installation: `node --version` and `npm --version`

### **Step 2: Extract the Finance Tracker**
- Extract the `Finance-Tracker-Complete.zip` file
- Navigate to the `Finance Tracker` folder

### **Step 3: Set Up Supabase (Optional for Demo)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key
4. Create a `.env` file in the Finance Tracker folder:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Step 4: Run the Auto-Launcher**

#### **Mac/Linux:**
```bash
cd "Finance Tracker"
./start-finance-tracker.sh
```

#### **Windows:**
```cmd
cd "Finance Tracker"
start-finance-tracker.bat
```

## 🎉 What Happens Next

1. **Auto-Launcher runs** and checks everything
2. **Dependencies are installed** (if needed)
3. **Development server starts** on `http://localhost:5173`
4. **Browser opens automatically** with Finance Tracker
5. **You can start using the application!**

## 🔧 Troubleshooting

### **"Node.js not found"**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal/command prompt

### **"npm not found"**
- Node.js installation includes npm
- Reinstall Node.js if npm is missing

### **"package.json not found"**
- Make sure you're in the `Finance Tracker` folder
- Extract the ZIP file properly

### **"Dependencies failed to install"**
- Check your internet connection
- Try running `npm install` manually
- Clear npm cache: `npm cache clean --force`

### **"Application won't start"**
- Check if port 5173 is available
- Try a different port: `npm run dev -- --port 3000`
- Check browser console for errors

## 📱 Browser Access

Once the server is running, you can access:

- **Local:** `http://localhost:5173`
- **Network:** `http://192.168.x.x:5173` (for other devices)

## 🎯 Features Available

✅ **Authentication System** with forgot password  
✅ **Real-time Financial Dashboard**  
✅ **Transaction Management**  
✅ **Budget Goals & Tracking**  
✅ **Smart Notifications**  
✅ **Financial Tips**  
✅ **Practice Data System**  
✅ **Data Export**  

## 🛑 Stopping the Application

- **Press `Ctrl+C`** in the terminal to stop the server
- **Close the browser tab** to exit the application

## 📞 Support

If you encounter issues:

1. **Check the terminal output** for error messages
2. **Verify Node.js installation**: `node --version`
3. **Check Supabase configuration** in `.env` file
4. **Try manual installation**: `npm install && npm run dev`

---

**🎉 Your Finance Tracker is now ready to auto-launch!** 