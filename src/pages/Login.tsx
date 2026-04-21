import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { LogIn, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ALLOWED_ADMIN_EMAILS } from "../constants";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        console.log("Checking admin access for:", u.email);
        const emailLower = u.email?.toLowerCase();
        if (emailLower && ALLOWED_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(emailLower)) {
          setIsAdmin(true);
          navigate("/admin");
        } else {
          setError(`Acesso restrito. O e-mail ${u.email} não tem permissão de administrador.`);
          await auth.signOut();
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError("Erro ao fazer login: " + err.message);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-brand-soft flex">
      <Navbar onOpenForm={() => {}} />
      <main className="flex-1 md:ml-72 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-3xl shadow-card max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
            <LogIn size={24} />
          </div>
          <h1 className="text-2xl font-serif text-brand-secondary mb-2">Área Administrativa</h1>
          <p className="text-sm text-brand-light mb-8">Faça login para gerenciar os conteúdos do blog.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 text-xs rounded-xl flex items-center gap-2">
              <ShieldAlert size={16} />
              {error}
            </div>
          )}

          <button 
            onClick={handleLogin}
            className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-brand-secondary transition-all"
          >
            Entrar com Google
          </button>
        </div>
      </main>
    </div>
  );
}
