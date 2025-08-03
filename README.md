# 💰 Finance Tracker

A comprehensive personal finance management application built with React, TypeScript, and Supabase. Track your income, expenses, investments, and get intelligent financial insights.

## ✨ Features

### 🔐 Authentication
- **User Registration & Login** with email/password
- **Forgot Password** functionality with secure email reset
- **Password Recovery** with step-by-step guidance
- **Secure authentication** using Supabase Auth

### 📊 Dashboard
- **Real-time Financial Statistics**
  - Monthly Income tracking
  - Monthly Expenses monitoring
  - Investment portfolio tracking
  - Net Income calculations
- **Quick Insights** with savings rate analysis
- **Smart Notifications** with personalized financial advice
- **Budget Goals** with progress tracking
- **Financial Tips** with educational content

### 💳 Transaction Management
- **Add/Edit/Delete** transactions
- **Categorize** transactions (Income, Expense, Investment)
- **Date-based** filtering and organization
- **CSV Export** functionality

### 🎯 Budget Goals
- **Set spending limits** by category
- **Visual progress tracking** with color-coded indicators
- **Monthly/Yearly** goal periods
- **Real-time progress** updates

### 📈 Analytics & Insights
- **Spending Charts** with category breakdown
- **Monthly Trends** analysis
- **Budget Forecasting** based on historical data
- **Savings Rate** calculations
- **Investment Tracking**

### 🧪 Practice Mode
- **Sample Data** for testing and learning
- **Realistic financial scenarios** to practice with
- **Educational content** for financial literacy

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for backend)

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Run database migrations**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the SQL from `supabase/migrations/20250803034748_royal_sea.sql`

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Sign up with any email address
   - Start tracking your finances!

## 🔑 Password Recovery

If you forget your password, the app provides a secure recovery system:

1. **Click "Forgot your password?"** on the login page
2. **Enter your email address** and click "Send Reset Link"
3. **Check your email** for a secure reset link from Supabase
4. **Click the link** to set a new password
5. **Enter your new password** and confirm it

For detailed instructions and troubleshooting, see [PASSWORD-RECOVERY-GUIDE.md](./PASSWORD-RECOVERY-GUIDE.md)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🎯 Key Features Explained

### Authentication System
- **Secure login/signup** with email verification
- **Password reset** via email with secure token validation
- **Password recovery guide** with comprehensive troubleshooting
- **Session management** with automatic logout

### Dashboard Analytics
- **Real-time calculations** of income, expenses, and investments
- **Savings rate analysis** with color-coded feedback
- **Budget alerts** for overspending
- **Investment tracking** with percentage calculations

### Practice Data
- **Sample transactions** for immediate testing
- **Realistic financial scenarios** ($5,950 income, $2,050 expenses)
- **Educational value** for learning personal finance

### Data Export
- **CSV export** of all transactions
- **Date-stamped filenames** for organization
- **Complete transaction history** export

## 🎉 Features Summary

✅ **Complete Authentication System**  
✅ **Secure Password Recovery System**  
✅ **Real-time Financial Tracking**  
✅ **Smart Notifications & Insights**  
✅ **Budget Goals & Progress Tracking**  
✅ **Practice Data for Learning**  
✅ **Data Export Functionality**  
✅ **Responsive Design**  
✅ **TypeScript for Type Safety**  
✅ **Modern React Patterns**  
✅ **Supabase Backend Integration**  

---

**Built with ❤️ for personal finance management** 