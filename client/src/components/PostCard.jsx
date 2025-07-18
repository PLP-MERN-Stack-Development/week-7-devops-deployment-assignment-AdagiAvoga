import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <div className="border rounded -1g p-4 shadow hover:shadow-md transition">
            {post.imageUrl && (
                <img
                src={`http://localhost:5000${post.imageUrl}`}
                    alt="Featured"
                    className="h-40 w-full object-cover rounded mb-2"
                />
            )}
            <h2 className="text-lg font-bold mb-1">{post.title}</h2>
            <p className="text-sm text-gray-500 italic">{post.category?.name}</p>
            <Link
            to={`/posts/${post._id}`}
            className="inline-block mt-2 text-blue-600 hover:underline"
            >
                Read More
            </Link>
        </div>
    );
};

export default PostCard;