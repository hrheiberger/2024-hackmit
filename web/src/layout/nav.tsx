import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem  } from "@/components/ui/navigation-menu";
import {
    Authenticated,
    AuthLoading,
    Unauthenticated,
  } from "convex/react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const NavComponent = (): JSX.Element => {

    const { user, isSignedIn } = useUser();

    return (
        <NavigationMenu className="!w-screen !max-w-full !fixed h-16">
            <NavigationMenuList className="!w-screen align-center justify-center">
                <NavigationMenuItem>
                    <NavigationMenuLink className={"p-4 !text-2xl !font-bold tracking-tight"}>
                        Unnamed Finance App
                    </NavigationMenuLink>
                </NavigationMenuItem>
                { isSignedIn ? <>
                    <NavSpacer />
                    <NavigationMenuItem>
                        <NavigationMenuLink className={"p-4 !text-2xl !font-bold tracking-tight"}>
                            Welcome {user.firstName}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </> : null }
                <NavSpacer />
                <NavigationMenuItem>
                    <Unauthenticated>
                        <SignInButton>
                        <Button className="m-4">Log In</Button>
                        </SignInButton>
                    </Unauthenticated>
                    <Authenticated>
                        <SignOutButton>
                            <Button className="m-4">Log Out</Button>
                        </SignOutButton>
                    </Authenticated>
                    <AuthLoading>
                        <div className="m-4"></div>
                    </AuthLoading>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const NavSpacer = () => <div style={{ flexGrow: 1 }} />