import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const navigate = useNavigate();
    
    const navigateProducts = (category: string) => {
        navigate(`/products?cat=${category}`);
    };
    
    return (
        <div className="homeContainer">
            <h1>Welcome to Adiago!</h1>
            <div className="categoriesContainer">
                <h2>Main categories:</h2>
                <div className="homeButtonsContainer">
                    <button onClick={() => navigateProducts("clothing")}>
                        <svg viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit"><path d="M47.36 14.75c.08.29-.021.61-.19.86l-5.39 8.02c-.2.31-.62.48-.971.48-.1 0-.38-.02-.489-.05L36 23v19c0 .58-.41 1-1 1H14c-.59 0-1-.42-1-1V23l-3.88 1.07c-.45.14-.84-.04-1.09-.43l-5.35-8c-.17-.26-.22-.55-.14-.84.07-.3.28-.5.55-.64L14 9h5c.59 0 1 .41 1 1 0 2.06 2.89 3.52 4.95 3.52S30 12.07 30 10c0-.58.41-1 1-1h5l10.8 5.06c.28.14.48.39.56.69"/></svg>
                    </button>
                    <button onClick={() => navigateProducts("jewelry")}>
                        <svg viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit"><path d="m46.476 20.662-.013-.101a1.3 1.3 0 0 0-.127-.362L40 10s-.808-1-1-1H12L3.88 19.853l-.096.1-.013.047a1.8 1.8 0 0 0-.168.35l-.033.097a1.6 1.6 0 0 0 .013.95l.038.109q.077.194.188.352L23.44 46.725l.04.057q.15.194.374.35l.114.071c.112.07.229.126.399.188l.111.037c.192.049.359.072.522.072.165 0 .326-.022.543-.078l.133-.047c.13-.046.247-.103.388-.19l.088-.055c.151-.107.272-.223.339-.314l19.656-24.893a1.75 1.75 0 0 0 .33-.79l.015-.129.008-.102zM35.936 20l2.798-5.063L41.53 20zm-1.678 3h6.638L29.832 37.015zm-1.642-4.518L28.575 13h7.07zM19.672 23h10.659L25 39.877zm1.057-3L25 14.204 29.271 20zm-3.008-1.972L15.869 13h5.557zm2.449 18.988L9.105 23h6.639zm-7.505-22.044L14.518 20H8.96z"/></svg>
                    </button>
                    <button onClick={() => navigateProducts("electronics")}>
                        <svg viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit"><path d="M25.507 22.572a2.743 2.743 0 0 0-2.741 2.74 2.743 2.743 0 0 0 2.741 2.74 2.744 2.744 0 0 0 2.741-2.74c0-1.511-1.23-2.74-2.741-2.74M41.824 4.073A2.073 2.073 0 0 0 39.752 2H10.073A2.073 2.073 0 0 0 8 4.073v41.856C8 47.073 8.928 48 10.073 48h29.679a2.07 2.07 0 0 0 2.072-2.071zM25.507 38.415c-7.225 0-13.103-5.877-13.103-13.103 0-7.224 5.878-13.102 13.103-13.102s13.101 5.878 13.101 13.102c-.001 7.226-5.878 13.103-13.101 13.103"/></svg>
                    </button>
                </div>
                <div className="labelsContainer">
                    <p>Clothing</p>
                    <p>Jewelry</p>
                    <p>Electronics</p>
                </div>
            </div>
        </div>
    );
}

export default Home;