import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ImageIcon, XIcon } from "lucide-react";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useSession } from "@/store/session";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useOpenAlertModal } from "@/store/alert-modal";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();

  const postEditorModal = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.", {
        position: "top-center",
      });
    },
  });
  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("포스트 수정에 실패했습니다.", {
        position: "top-center",
      });
    },
  });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!postEditorModal.isOpen) {
      images.forEach((image) => {
        // revokeObjectURL : 메모리에서 특정 Object 삭제
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }

    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else {
      setContent(postEditorModal.content);
      setImages([]);
    }

    textareaRef.current?.focus();
  }, [postEditorModal.isOpen]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성 중이던 내용이 사라집니다.",
        onPositive: () => {
          postEditorModal.actions.close();
        },
      });

      return;
    }
    postEditorModal.actions.close();
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  const handleSavePostClick = () => {
    if (!postEditorModal.isOpen) return;
    if (content.trim() === "") return;

    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session!.user.id,
      });
    } else {
      if (content == postEditorModal.content) return;

      updatePost({
        id: postEditorModal.postId,
        content: content,
      });
    }
  };

  const isPending = isCreatePostPending || isUpdatePostPending;

  return (
    <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          className="max-h-125 min-h-25 focus:outline-none"
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
          placeholder="무슨 일이 있었나요?"
        />
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleSelectImages}
          accept="image/*"
          multiple
        />
        {postEditorModal.isOpen && postEditorModal.type === "EDIT" && (
          <Carousel>
            <CarouselContent>
              {postEditorModal.imageUrls?.map((url) => (
                <CarouselItem className="basis-2/5" key={url}>
                  <div className="relative">
                    <img
                      className="rouded-sm h-full w-full object-cover"
                      src={url}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      className="rouded-sm h-full w-full object-cover"
                      src={image.previewUrl}
                    />
                    <div
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {postEditorModal.isOpen && postEditorModal.type === "CREATE" && (
          <Button
            className="cursor-pointer"
            variant={"outline"}
            onClick={() => {
              fileInputRef.current?.click();
            }}
            disabled={isPending}
          >
            <ImageIcon />
            이미지 추가
          </Button>
        )}
        <Button
          className="cursor-pointer"
          onClick={handleSavePostClick}
          disabled={isPending}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
