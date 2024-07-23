import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Register from './components/Register';
import Login from './components/login';
import { UserProvider } from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<ProtectedRoute><RecipeList /></ProtectedRoute>} />
                            <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
                            <Route path="/recipe/:id" element={<RecipeDetails />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
