import BasicPieChart from "@/components/Visualization/BasicPieChart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";;
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge"
import { useUser } from "@clerk/clerk-react";
import React from "react";

export const DisplayComponent = (): JSX.Element => {
    const { user } = useUser();
    const { toast } = useToast();

    const [ tickerInput, setTickerInput ] = React.useState<string>('');
    const [ userTickers, setUserTickers ] = React.useState<Array<string>>(['NVDA', 'GOOG', 'TENS', 'URMO', 'LIGM']);

    React.useEffect(() => {
        // TODO Use the API to update `userTickers` by calling `setUserTickers` with the new data
    }, [])

    const addTicker = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO Use `tickerInput` to add a ticket to the user's account
    }

    const deleteTicker = (tickerCode: string) => {
        console.log(tickerCode);
        toast({
            description: `Deleted ticker ${tickerCode}`,
        });
        // TODO Call the API to delete tickers based on the `tickerCode` and maybe update userTickers?
    }

    return (
        <main className="mx-12 h-screen flex flex-col sm:flex-row gap-8 items-center justify-center">
            <BasicPieChart
                height={Math.floor(window.innerHeight * .8)}
                width={Math.floor(window.innerWidth * .6)}
                top={10}
                bottom={10}
                left={10}
                right={10}
            />
            <Separator className="my-10" style={{ width: 1.5, minHeight: '50%' }} />
            <section className="flex flex-col items-center justify-center flex-grow">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Add a Ticker
                </h2>
                <form className="flex w-3/4 max-w-sm items-center space-x-2 my-4" onSubmit={addTicker}>
                    <Input value={tickerInput} onChange={e => setTickerInput(e.target.value)} required type="text" placeholder="Ticker" />
                    <Button type="submit">Add</Button>
                </form>
                <h2 className="scroll-m-20 border-b mt-8 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Delete a Ticker
                </h2>
                <div className="div flex flex-row flex-wrap">
                    {userTickers.map((tickerCode, i) => (
                        <Badge className="m-2 cursor-pointer" variant="destructive" key={i} onClick={() => deleteTicker(tickerCode)}>{tickerCode}</Badge>
                    ))}
                </div>
            </section>
        </main>
    );
}