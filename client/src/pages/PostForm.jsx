import { useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PostForm = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    const isEditing = Boolean(id);

    useEffect(() => {
        api.get('/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        if (isEditing) {
            api.get(`/posts/${id}`)
            .then(res => {
                const post = res.data ;
                setTitle(post.title);
                setContent(post.content);
                setCategory(post.category?._id || '');
            })
            .catch(err => console.error(err));
        }
    }, [id]);

    const handleImageUpload = async () => {
        if (!image) return null;

        const formData = new FormData();
        formData.append('image', image);

        const res = await api.post('/upload', formData);
        return res.data.imageUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !content || !category) {
            return setError('All fields are required.');
        }

        try {
            const imageUrl = await handleImageUpload ();

            const payload = { title, content, category };
            if (imageUrl) payload.imageUrl = imageUrl;

            if (isEditing) {
                await api.put(`/posts/${id}`, payload);
            } else {
                await api.post('/posts', payload);
            }

            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to save post.');
        }
        };

        if (!user) {
            return <p className="text-red-500"> You must be logged in to write a post.</p>;
        }

        return (
            <div className="max-w-2xl mx-auto space-y-4"> 
            <h1 className="text-2xl font-bold">{isEditing ? 'Edit Post' : 'Create New Post'}</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                />

                <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border p-2 rounded">

                    <option value="">-- Select Category --</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                            </option>
                    ))}
                    </select>

                    <textarea
                    rows="6"
                    placeholder="Post content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full border p-2 rounded"
                    />

                    <input 
                    type="file"
                    accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                    />

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        {isEditing ? 'Update Post' : 'Create Post'}
                        </button>
                        </form>
                        </div>
        );
    };
        
    export default PostForm;
