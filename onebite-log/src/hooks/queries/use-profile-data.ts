import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/store/session";
import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import type { PostgrestError } from "@supabase/supabase-js";

export function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        // 자신의 프로필 정보를 조회할 때 프로필 정보가 존재하지 않는다면
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    queryKey: QUERY_KEYS.profile.byId(userId!),
    enabled: !!userId,
  });
}
