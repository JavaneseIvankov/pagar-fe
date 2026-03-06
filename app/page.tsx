import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
  return (
    <main
      id="root-layout"
      className="container mx-auto min-h-screen w-full min-w-screen"
    >
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="prose">
          <CardHeader>
            <h1 className="">Hello World</h1>
            <div className="relative h-[100px] w-[100px]">
              <Image
                src={"https://placehold.co/600x400"}
                className="absolute mt-0 mb-0"
                alt="placeholder"
                fill
              ></Image>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              sint dolorum, a quidem praesentium architecto itaque aliquam
              error. Ipsum magnam facere voluptatem placeat harum soluta beatae,
              sed quos eveniet alias.
            </p>
          </CardContent>
          <CardFooter>
            <CardAction>
              <Button variant="outline">Click Me</Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
