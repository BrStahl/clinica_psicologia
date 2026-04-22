import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { BlogPost } from "../types";
import Navbar from "../components/Navbar";
import { Plus, Edit2, Trash2, LogOut, FileText, LayoutDashboard } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ALLOWED_ADMIN_EMAILS } from "../constants";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      const emailLower = u?.email?.toLowerCase();
      const isAllowed = emailLower && ALLOWED_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(emailLower);
      
      if (!u || !isAllowed) {
        navigate("/login");
      } else {
        setUser(u);
        fetchPosts();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja realmente excluir este post?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        alert("Erro ao excluir post: " + error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-soft">
      <Navbar onOpenForm={() => {}} />
      <main className="pt-20 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#F0F0F0] px-10 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-soft text-brand-primary rounded-lg">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-xl font-serif text-brand-secondary">Painel de Controle</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-brand-light font-medium">{user.email}</span>
            <button 
              onClick={handleLogout}
              className="text-brand-light hover:text-red-500 transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <section className="p-10">
          <div className="max-w-6xl">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-serif text-brand-secondary mb-2">Seus Artigos</h2>
                <p className="text-sm text-brand-light">Gerencie e publique novos textos para o seu público.</p>
              </div>
              <Link 
                to="/admin/new"
                className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20"
              >
                <Plus size={18} />
                Novo Texto
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-card overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-brand-soft border-b border-[#F0F0F0]">
                      <th className="px-8 py-5 text-[11px] font-bold text-brand-accent uppercase tracking-widest">Título</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-brand-accent uppercase tracking-widest">Data</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-brand-accent uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-brand-accent uppercase tracking-widest text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F5F5]">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-brand-soft transition-colors text-brand-light">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <FileText size={16} className="text-brand-accent" />
                            <span className="font-medium text-brand-secondary line-clamp-1">{post.title}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm">
                          {format(post.createdAt.toDate(), "dd/MM/yyyy", { locale: ptBR })}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            post.status === 'published' 
                              ? 'bg-green-50 text-green-600' 
                              : 'bg-orange-50 text-orange-600'
                          }`}>
                            {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link 
                              to={`/admin/edit/${post.id}`}
                              className="p-2 text-brand-light hover:text-brand-primary hover:bg-white rounded-lg transition-all"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-brand-light hover:text-red-500 hover:bg-white rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {posts.length === 0 && (
                  <div className="p-20 text-center text-brand-light italic">
                    Nenhum post encontrado. Comece escrevendo o seu primeiro!
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
