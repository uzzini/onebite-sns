import ProfileInfo from "@/components/profile/profile-info";
import PostFeed from "@/components/post/post-feed";
import { useEffect } from "react";
import { useParams, Navigate } from "react-router";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  if (!userId) return <Navigate to={"/"} replace />;

  return (
    <div className="flex flex-col gap-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      <PostFeed authorId={userId} />
    </div>
  );
}
