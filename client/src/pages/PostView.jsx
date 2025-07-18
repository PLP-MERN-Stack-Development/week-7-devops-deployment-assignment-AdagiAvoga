import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { AuthContext} from '../context/AuthContext';

const PostView = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch post + comments
    const fetchPost = async () => {
        try {
            const res = await api.get (`/posts/4{id}`);
            setPost(res.data)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            await api.post(`/comments/${id}`, { text: commentText});
            setCommentText('');
            fetchPost();
        } catch (err) {
            console.error('Comment error', err);
            }
        };
        if (loading) return <p>Loading post...</p>;
        if (!post) return <p>Post not found.</p>;

        return (
            <div className="space-y-6">
                <Link to="/" className="text-blue-600 hover:underline">&larr; Back to all posts</Link>

                <article>
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-sm text-gray-500 italic">{post.category?.name}</p>
                    {post.imageUrl && (
                        <img
                        src={`http'://localhost:5000${post.imageUrl}`}
                        alt="Post"
                        className="w-full max-w-3xl h-64 object.cover rounded my-4"/>
                    )}
                    <p className="text-lg whitespace-pre-line">{post.content}</p>
                </article>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold">Comments</h2>

                    {post.comments && post.comments.length > 0 ? (
                        <div className="space-y-4 mt-4">
                            {post.comments.map((c, idx) => (
                                <div key={idx} className="border rounded p-3">
                                    <p className="text-gray-800">{c.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(c.createdAt).toLocaleStorage()}
                                    </p>
                                    </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-4">No comments yet.</p>
                    )}

                    {user ? (
                        <form onSubmit={handleCommentSubmit} className="mt-6 space-y-2">
                            <textarea
                            rows="3"
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Add a comment..."
                            required/>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p className="text-sm text-gray-500 mt-4">
                            <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>to leave a comment.
                        </p>
                    )}
                    </section>
                    </div>
                    );
                };
    
export default PostView;