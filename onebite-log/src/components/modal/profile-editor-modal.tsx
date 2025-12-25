import Loader from "../loader";
import Fallback from "../fallback";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useSession } from "@/store/session";
import { useProfileEditorModal } from "@/store/profile-editor-modal";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile";

type Image = { file: File; previewUrl: string };

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다.", {
          position: "top-center",
        });
      },
    });

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [profile, isOpen]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;
    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        {isFetchProfilePending && <Loader />}
        {fetchProfileError && <Fallback />}
        {!fetchProfileError && !isFetchProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                onChange={handleSelectImage}
                disabled={isUpdateProfilePending}
                accept="image/*"
              />
              <img
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
                src={
                  avatarImage?.previewUrl || profile.avatar_url || defaultAvatar
                }
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isUpdateProfilePending}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isUpdateProfilePending}
              />
            </div>

            <Button
              className="cursor-pointer"
              onClick={handleUpdateClick}
              disabled={isUpdateProfilePending}
            >
              수정하기
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
