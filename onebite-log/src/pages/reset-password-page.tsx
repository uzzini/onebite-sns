import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUpdatePassword } from "@/hooks/mutations/use-update-password";
import { generateErrorMessage } from "@/lib/error";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("비밀번호가 성공적으로 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;

    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-lx font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력하세요.
        </div>
      </div>
      <Input
        className="py-6"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isUpdatePasswordPending}
        placeholder="password"
      />
      <Button
        className="w-full"
        onClick={handleUpdatePasswordClick}
        disabled={isUpdatePasswordPending}
      >
        비밀번호 변경
      </Button>
    </div>
  );
}
