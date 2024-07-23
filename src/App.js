import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Register from './components/Register';
import Login from './components/login';
import MyRecipes from './components/MyRecipes';
import { UserProvider } from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';
import StarredRecipes from './components/StarredRecipes';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<RecipeList />} />
                            <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
                            <Route path="/Starred-recipe" element={<ProtectedRoute><StarredRecipes /></ProtectedRoute>} />
                            <Route path="/recipe/:id" element={<RecipeDetails />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;
