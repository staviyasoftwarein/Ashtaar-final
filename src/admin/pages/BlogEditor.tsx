import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { useSetting } from '../../hooks/useSetting';
import { DEFAULT_BLOG, formatBlogDate, nextBlogId, todayIsoDate, toIsoDate, type BlogConfig, type BlogPost } from '../../lib/blog';
import { Button, Card, Field, Input, Textarea, Toast } from '../components/ui';

function deepEqual<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function BlogEditor() {
  const { value: saved, loading, save } = useSetting<BlogConfig>('blog', DEFAULT_BLOG);
  const [draft, setDraft] = useState<BlogConfig>(saved);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [sessionNew, setSessionNew] = useState<Set<string>>(new Set());

  useEffect(() => { setDraft(saved); setSessionNew(new Set()); }, [saved]);

  const dirty = !deepEqual(draft, saved);

  const updatePost = (i: number, patch: Partial<BlogPost>) => {
    const posts = draft.posts.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    setDraft({ ...draft, posts });
  };

  const addPost = () => {
    const id = nextBlogId(draft.posts);
    setDraft({
      ...draft,
      // Append at the bottom in-session so the existing "Live #1..3" cards
      // don't shift under the user's scroll position. onSave reorders them
      // to the top so they appear newest-first on next mount.
      posts: [
        ...draft.posts,
        { id, title: '', category: '', date: todayIsoDate(), comments: 0, excerpt: '', content: '' },
      ],
    });
    setSessionNew((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const removePost = (i: number) => {
    setDraft({ ...draft, posts: draft.posts.filter((_, idx) => idx !== i) });
  };

  const movePost = (i: number, dir: -1 | 1) => {
    const next = i + dir;
    if (next < 0 || next >= draft.posts.length) return;
    const posts = [...draft.posts];
    [posts[i], posts[next]] = [posts[next], posts[i]];
    setDraft({ ...draft, posts });
  };

  const onSave = async () => {
    setBusy(true);
    setMsg(null);
    try {
      // Promote any in-session new posts to the top, preserving the order
      // they were added. Existing posts keep their relative order.
      const newOnes = draft.posts.filter((p) => sessionNew.has(p.id));
      const rest = draft.posts.filter((p) => !sessionNew.has(p.id));
      const reordered: BlogConfig = { ...draft, posts: [...newOnes.reverse(), ...rest] };
      await save(reordered);
      setSessionNew(new Set());
      setMsg({ kind: 'success', text: 'Saved. Reload the public site to see changes.' });
    } catch (e) {
      setMsg({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8 pb-32">
      <header>
        <h2 className="font-serif text-3xl text-white tracking-tight">Journal — Cinematic Insights</h2>
        <p className="mt-1 text-sm text-[#A3A3A3] font-sans">
          The first three posts (top of the list) appear on the public site. All posts appear in the
          "Explore All Stories" modal. Use the arrows to reorder.
        </p>
      </header>

      <Card title={`Posts (${draft.posts.length})`} hint="Drag-equivalent: use ↑ / ↓ arrows on each card to reorder. Newest goes on top.">
        <div className="space-y-5">
          {draft.posts.map((post, i) => (
            <div
              key={post.id}
              className={`rounded-lg border bg-[var(--color-surface-2)] p-5 space-y-4 ${i < 3 ? 'border-[var(--color-gold)]/30' : 'border-[var(--color-line)]'}`}
            >
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-sans uppercase tracking-[0.18em] px-2 py-1 rounded ${i < 3 ? 'bg-[var(--color-gold)]/15 text-[var(--color-gold)]' : 'bg-white/5 text-[#525252]'}`}>
                      {i < 3 ? `Live · #${i + 1} on home` : `Archive · only in modal`}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Title">
                      <Input
                        value={post.title}
                        onChange={(e) => updatePost(i, { title: e.target.value })}
                        placeholder="The Vision Behind Ashtaar Films…"
                      />
                    </Field>
                    <Field label="Category" hint="Short label, e.g. 'Vision', 'Production', 'Technical'.">
                      <Input
                        value={post.category}
                        onChange={(e) => updatePost(i, { category: e.target.value })}
                      />
                    </Field>
                    <Field
                      label="Date"
                      hint={post.date ? `Displays as: ${formatBlogDate(post.date)}` : 'Pick a date — defaults to today for new posts.'}
                    >
                      <Input
                        type="date"
                        max={todayIsoDate()}
                        value={toIsoDate(post.date) || todayIsoDate()}
                        onChange={(e) => {
                          const picked = e.target.value;
                          if (picked && picked > todayIsoDate()) return;
                          updatePost(i, { date: picked });
                        }}
                      />
                    </Field>
                    <Field label="Comments count">
                      <Input
                        type="number"
                        value={post.comments}
                        onChange={(e) => updatePost(i, { comments: Number(e.target.value) || 0 })}
                      />
                    </Field>
                  </div>

                  <Field label="Excerpt" hint="Shown on the public card and in the modal list.">
                    <Textarea
                      rows={2}
                      value={post.excerpt}
                      onChange={(e) => updatePost(i, { excerpt: e.target.value })}
                    />
                  </Field>

                  <Field label="Full content" hint="Shown inside the modal when the post is opened.">
                    <Textarea
                      rows={6}
                      value={post.content}
                      onChange={(e) => updatePost(i, { content: e.target.value })}
                    />
                  </Field>
                </div>

                <div className="flex md:flex-col items-center md:items-end gap-3 self-start shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => movePost(i, -1)}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="p-1.5 rounded text-[#A3A3A3] hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => movePost(i, 1)}
                      disabled={i === draft.posts.length - 1}
                      aria-label="Move down"
                      className="p-1.5 rounded text-[#A3A3A3] hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePost(i)}
                    className="text-[#A3A3A3] hover:text-red-400 transition-colors p-2 rounded-md hover:bg-red-500/5"
                    aria-label={`Remove ${post.title}`}
                    title="Remove post"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPost}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-[var(--color-line-strong)] text-[#A3A3A3] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/60 transition-colors text-sm font-sans"
          >
            <Plus size={14} /> Add post (newest goes on top)
          </button>
        </div>
      </Card>

      {msg && <Toast kind={msg.kind}>{msg.text}</Toast>}

      <AnimatePresence>
        {dirty && !loading && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-[calc(240px+24px)] right-6 z-30"
          >
            <div className="max-w-5xl mx-auto rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-surface)] backdrop-blur shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] flex items-center gap-4 p-4">
              <span className="text-sm font-sans text-white">Unsaved blog changes</span>
              <div className="ml-auto flex items-center gap-3">
                <Button variant="ghost" onClick={() => { setDraft(saved); setSessionNew(new Set()); }} disabled={busy}>Discard</Button>
                <Button variant="primary" onClick={onSave} loading={busy}>Save changes</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

