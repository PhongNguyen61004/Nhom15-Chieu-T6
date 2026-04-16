export default function Rightbar({ stats }) {
  return (
    <div className="rightbar">
      <h3>System Stats</h3>
      <p>Users: {stats.users}</p>
      <p>Posts: {stats.posts}</p>
      <p>Comments: {stats.comments}</p>
      <p>Likes: {stats.likes}</p>
    </div>
  );
}