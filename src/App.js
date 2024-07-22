import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
import './styles.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<RecipeList />} />
                        <Route path="/add-recipe" element={<AddRecipe />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
