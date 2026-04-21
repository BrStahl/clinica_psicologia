import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../lib/firebase";
import { BlogPost } from "../types";
import Footer from "../components/Footer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, Calendar, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MainLayout from "../components/MainLayout";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const q = query(
          collection(db, "posts"),
          where("slug", "==", slug),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setPost({ id: doc.id, ...doc.data() } as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-soft flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-serif text-brand-secondary mb-4">Post não encontrado</h1>
          <Link to="/blog" className="text-brand-primary flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
            <ChevronLeft size={16} /> Voltar ao Blog
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
        <article className="max-w-4xl mx-auto w-full p-6 lg:p-14 mb-20">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-[2px] mb-8 hover:text-brand-primary transition-colors"
          >
            <ChevronLeft size={16} /> Voltar ao Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-[10px] text-brand-accent font-bold uppercase tracking-widest mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {format(post.createdAt.toDate(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif text-brand-secondary leading-tight mb-8">
              {post.title}
            </h1>
            {post.imageUrl && (
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border-8 border-white">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="bg-brand-soft p-6 rounded-2xl border-l-4 border-brand-accent italic text-brand-light leading-relaxed mb-12">
              {post.excerpt}
            </div>
          </header>

          <div className="prose prose-brand max-w-none text-brand-light leading-relaxed text-lg lg:text-xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <footer className="mt-20 pt-10 border-t border-[#F0F0F0] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-serif italic text-xl">
                M
              </div>
              <div>
                <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest">Dra. Michele Braz</p>
                <p className="text-[10px] text-brand-accent uppercase tracking-wider">Psicóloga Clínica</p>
              </div>
            </div>
            <button className="p-3 bg-white rounded-full shadow-md text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
              <Share2 size={18} />
            </button>
          </footer>
        </article>
        <Footer />
    </MainLayout>
  );
}
