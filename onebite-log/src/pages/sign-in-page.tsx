import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-oauth";
import { generateErrorMessage } from "@/lib/error";
import gitHubLogo from "@/assets/github-mark.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });
  const { mutate: signInWitOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithGitHubClick = () => {
    signInWitOAuth("github");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          placeholder="example@abc.com"
        />
        <Input
          className="py-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={handleSignInWithPasswordClick}
          disabled={isPending}
        >
          로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithGitHubClick}
          disabled={isPending}
        >
          <img className="h-4 w-4" src={gitHubLogo} />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
