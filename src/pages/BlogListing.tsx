import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { BlogPost } from "../types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookOpen, Calendar, Clock, BookText } from "lucide-react";
import { motion } from "motion/react";

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(
          collection(db, "posts"),
          where("status", "==", "published"),
          orderBy("createdAt", "desc")
        );
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
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-brand-soft flex">
      <Navbar onOpenForm={() => {}} />
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen">
        <section className="p-10 lg:p-14">
          <div className="max-w-6xl">
            <header className="mb-12">
              <h2 className="text-brand-primary font-bold uppercase tracking-[2px] text-xs mb-2">Reflexões & Artigos</h2>
              <h1 className="text-4xl font-serif text-brand-secondary">Blog da Dra. Michele</h1>
              <p className="mt-4 text-brand-light max-w-2xl leading-relaxed">
                Um espaço dedicado ao compartilhamento de conhecimentos sobre saúde mental, neuropsicologia e o bem-estar do ser humano.
              </p>
            </header>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
              </div>
            ) : posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl shadow-card overflow-hidden group flex flex-col h-full"
                  >
                    {post.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-[10px] text-brand-accent font-bold uppercase tracking-widest mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {format(post.createdAt.toDate(), "dd 'de' MMMM", { locale: ptBR })}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-[13px] text-brand-light leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[11px] font-bold text-brand-primary uppercase tracking-wider group/link"
                        >
                          Continuar lendo
                          <BookOpen size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="bg-white/50 border border-[#F0F0F0] rounded-2xl p-20 text-center">
                <BookText className="mx-auto text-brand-accent opacity-20 mb-4" size={48} />
                <p className="text-brand-light italic">Ainda não há publicações. Em breve traremos conteúdos exclusivos para você.</p>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

