"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {AiComponent} from "./ai";
export default function Page() {
  return (
    <main>
      <div className="flex flex-col items-center justify-between p-4 max-w-md mx-auto">
        <div className="flex flew-row gap-3" >
        <Input className="mb-2 w-full" placeholder="Type here" />
        <Button className="mb-2">Click me</Button>
        </div>
        <div>
          <AiComponent />
        </div>
      </div>
    </main>
  );
}
