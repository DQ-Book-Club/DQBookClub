import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useSigninCheck } from "reactfire";

export default function AuthGuard({ children }: PropsWithChildren): JSX.Element {
  const { status, data: signInCheckResult } = useSigninCheck();
  const router = useRouter()

  useEffect(() => {
    if (signInCheckResult?.signedIn === false) {
      router.push(`/login?returnTo=${router.asPath}`);
    } 
  }, [status, signInCheckResult])

  if (!router.asPath.includes('login') && status === 'loading') {
    return <span>loading...</span>;
  } else {
    return <>{children}</>
  }
}