import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import api from '../services/api';
import PostCard from '../components/PostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch ] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        try {
            const res = await api.get(`/posts?search=${search}&category=${category}&page=${page}`);
            setPosts(res.data.posts);
            setTotalPages(res.data.totalPages);
        }catch (err) {
            console.error(err);
        }
        };
        const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        }catch (err) {
            console.error(err);
    }
};

useEffect(() => {
    fetchPosts();
    fetchCategories();
}, [search, category, page]);

return (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold">All Blog Posts</h1>

        {/* Filters */}
        <div className="flex gap-4 items-center">
            <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
            />
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="border px-2 py-1 rounded"
            >
            <option value="">All Categories</option>
            {Array.isArray(categories) && categories.map(cat => (

                <option key={cat._id} value={cat._id}>
                    {cat.name}
                    </option>
            ))}
            </select>
            </div>

        {/* Posts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(posts) && posts.map(post => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-2 justify-center pt-4">
        <button
            onClick={() => setPage(prev => Math.max (prev -1, 1))}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={page === 1}
            >
                Prev            
            </button>
            <span className="px-3 py-1">{page} / {totalPages}</span>

            <button
            onClick={() => setPage(prev => Math.min (prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={page === totalPages}
            >
                Next            
            </button>
        </div>
        </div>
);
};

export default Home;