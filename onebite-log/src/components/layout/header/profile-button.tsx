import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Link } from "react-router";
import { useSession } from "@/store/session";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { signOut } from "@/api/auth";

export default function ProfileButton() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <img
          className="h-6 w-6 cursor-pointer rounded-full object-cover"
          src={profile?.avatar_url || defaultAvatar}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session.user.id}`}>
            <div className="hpver:bg-muted cursor-pointer px-4 py-3 text-sm">
              프로필
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div
            className="hpver:bg-muted cursor-pointer px-4 py-3 text-sm"
            onClick={signOut}
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
