import { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect( () => {
        const checkAuth = async () => {
            try {
                await axiosInstance.get('/auth/protected');
                setIsAuthenticated(true)
            } catch (error) {
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    }, [] )


    if (isAuthenticated === null) {
        return (
            <div className="loadingContainer">
                <ThreeDots color="#003077" height={80} width={80} />
            </div>
        );
    }

    if (!isAuthenticated) {
        navigate('/login')
    }

    return children;
}