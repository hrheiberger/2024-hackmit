import { SignedIn } from "@clerk/clerk-react"
import { Authenticated, Unauthenticated } from "convex/react"
import { TypeAnimation } from "react-type-animation"

export const HomeComponent = (): JSX.Element => {
    return (
        <main className="container max-w-4xl h-screen flex flex-col gap-8 align-items justify-center">
      <TypeAnimation
            sequence={[
              'Unnamed Finance App',
              3000,
              'Unnamed Finance Blockchain',
              2000,
              'Unnamed Finance Unicorn Company',
              2000,
              'Unnamed Finance Major (Derogatory)',
              1000,
              'Unnamed Finance LLM',
              2000,
              'Unnamed Finance ChatGPT Wrapper',
              2000
            ]}
            preRenderFirstString
            repeat={Infinity}
            className="text-6xl font-extrabold my-8 text-center"
            />
      </main>
    )
}