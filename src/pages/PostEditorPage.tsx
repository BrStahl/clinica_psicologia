import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { ChevronLeft, Save, Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
};

import { ALLOWED_ADMIN_EMAILS } from "../constants";

export default function PostEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    status: "draft" as 'draft' | 'published'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      const emailLower = u?.email?.toLowerCase();
      const isAllowed = emailLower && ALLOWED_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(emailLower);
      
      if (!u || !isAllowed) {
        navigate("/login");
      } else {
        if (id) {
          fetchPost(id);
        } else {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [id, navigate]);

  async function fetchPost(postId: string) {
    try {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPostData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          imageUrl: data.imageUrl || "",
          status: data.status
        });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPostData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === "title" && !id) {
        newData.slug = slugify(value);
      }
      return newData;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setSaving(true);
    try {
      const postId = id || slugify(postData.title) || Date.now().toString();
      const payload = {
        ...postData,
        authorId: auth.currentUser.uid,
        updatedAt: serverTimestamp(),
      };

      if (!id) {
        (payload as any).createdAt = serverTimestamp();
        await setDoc(doc(db, "posts", postId), payload);
      } else {
        await updateDoc(doc(db, "posts", id), payload);
      }
      
      navigate("/admin");
    } catch (error) {
      alert("Erro ao salvar post: " + error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-brand-soft">
      <Navbar onOpenForm={() => {}} />
      <main className="pt-20 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#F0F0F0] px-10 py-6 flex justify-between items-center sticky top-20 z-20">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="p-2 text-brand-light hover:text-brand-primary transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-serif text-brand-secondary">
              {id ? "Editar Artigo" : "Novo Artigo"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <button 
                type="button"
                onClick={() => setPostData(p => ({ ...p, status: p.status === 'published' ? 'draft' : 'published' }))}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
                    postData.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}
             >
                {postData.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                {postData.status === 'published' ? 'Publicado' : 'Rascunho'}
             </button>
             <button 
                form="post-form"
                disabled={saving}
                className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brand-secondary disabled:opacity-50 transition-all"
             >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Salvar
             </button>
          </div>
        </header>

        <form id="post-form" onSubmit={handleSave} className="p-10 max-w-4xl w-full mx-auto space-y-8 pb-32">
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-accent uppercase tracking-widest">Título do Artigo</label>
            <input 
              required
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Ex: Como lidar com a ansiedade no dia a dia"
              className="w-full text-3xl font-serif text-brand-secondary bg-transparent border-b-2 border-brand-primary/20 focus:border-brand-primary outline-none py-2 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
                <label className="text-xs font-bold text-brand-accent uppercase tracking-widest">URL (Slug)</label>
                <input 
                    required
                    name="slug"
                    value={postData.slug}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#F0F0F0] rounded-xl px-4 py-3 text-sm text-brand-light font-mono focus:border-brand-primary outline-none"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-brand-accent uppercase tracking-widest">URL da Imagem Capa</label>
                <input 
                    name="imageUrl"
                    value={postData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="w-full bg-white border border-[#F0F0F0] rounded-xl px-4 py-3 text-sm text-brand-light focus:border-brand-primary outline-none"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-accent uppercase tracking-widest">Resumo (Excerpt)</label>
            <textarea 
              required
              name="excerpt"
              value={postData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Uma breve introdução para aparecer na listagem..."
              className="w-full bg-white border border-[#F0F0F0] rounded-2xl px-6 py-4 text-brand-light leading-relaxed outline-none focus:border-brand-primary transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-accent uppercase tracking-widest">Conteúdo (Markdown)</label>
            <textarea 
              required
              name="content"
              value={postData.content}
              onChange={handleChange}
              rows={15}
              placeholder="Escreva seu texto aqui. Você pode usar Markdown para formatar..."
              className="w-full bg-white border border-[#F0F0F0] rounded-3xl px-8 py-8 text-brand-light leading-relaxed text-lg outline-none focus:border-brand-primary transition-all font-sans"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
