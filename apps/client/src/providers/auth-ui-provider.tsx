import { authClient } from "@/lib/auth";
// import { router } from "@/routes/route";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useNavigate, NavLink } from "react-router-dom";

// Wrapper component to convert href to to prop
const LinkWrapper = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof NavLink>, "to">) => (
  <NavLink to={href} {...props}>
    {children}
  </NavLink>
);

export function AuthProviders({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={navigate}
      Link={LinkWrapper}
    >
      {children}
    </AuthUIProvider>
  );
}
