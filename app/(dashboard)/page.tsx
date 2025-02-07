import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import CreateTransactionDialogue from "@/app/(dashboard)/_components/CreateTransactionDialogue";

export default async function page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  return(
      <div className="h-full bg-background w-full">
        <div className="border-b bg-card w-full">
          <div className="flex flex-wrap items-center justify-between py-8 gap-6 w-full px-8">
            <p className="text-3xl font-bold">{`Hello ${user.firstName}! 👋`}</p>
            <div className="flex items-center gap-3">
              <CreateTransactionDialogue
                  trigger={
                    <Button
                        variant="outline"
                        className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                    >
                      New income 😁
                    </Button>
                  }
                  type="income"
              />
              <CreateTransactionDialogue
                  trigger={
                    <Button
                        variant="outline"
                        className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                    >
                      New expense 😤
                    </Button>
                  }
                  type="expense"
              />
            </div>
          </div>
        </div>
      </div>
  )
}
