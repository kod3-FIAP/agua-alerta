import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { EmergencyMap } from "./_components/emergency-map";
import { AddEntryDialog } from "./_components/add-entry-dialog";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="sm:mb-8 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="sm:mb-0 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Bem-vindo, {session.user.name ?? session.user.email}!
            </p>
          </div>
          <AddEntryDialog />
        </div>

        <div className="mb-8">
          <EmergencyMap />
        </div>
      </div>
    </div>
  );
}
