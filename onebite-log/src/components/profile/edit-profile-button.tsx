import { Button } from "../ui/button";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";

export default function EditProfileButton() {
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button
      className="cursor-pointer"
      variant={"secondary"}
      onClick={openProfileEditorModal}
    >
      프로필 수정
    </Button>
  );
}
